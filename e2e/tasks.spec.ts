import { test, expect } from '@playwright/test';
import { TaskPage } from './pages/TaskPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
})

test.describe('Task Management', () => {
  test.describe('Happy Path', () => {
    test('should create a task successfully', async ({ page}) => {
      const taskPage = new TaskPage(page);
      await taskPage.createTask('Nova Tarefa');
  
      await expect(page.getByText('Tarefa adicionada com sucesso!')).toBeVisible()
      await expect(page.getByText('Nova Tarefa')).toBeVisible();
    });
  
    test('should edit a task successfully', async ({ page }) => {
      const taskPage = new TaskPage(page);
      await taskPage.createTask('Tarefa para Editar');
      await taskPage.editTask('Tarefa Editada');
  
      await expect(page.getByText('Tarefa atualizada com sucesso!')).toBeVisible();
      await expect(page.getByText('Tarefa Editada')).toBeVisible();
    });
  
    test('should delete a task successfully', async ({page}) => {
      const taskPage = new TaskPage(page);
      await taskPage.createTask('Tarefa para Excluir');
      await taskPage.deleteTask();

      await expect(page.getByText('Tarefa excluída com sucesso!')).toBeVisible();
      await expect(page.getByText('Tarefa para Excluir')).not.toBeVisible();
    });
  
    test('should display message when searching for non-existent task', async ({ page }) => {
      const taskPage = new TaskPage(page);
      await taskPage.createTask('Outra Tarefa');
      await page.getByPlaceholder("Buscar tarefas...").fill('Tarefa para Buscar');
  
      await expect(page.getByText(/🔍 Nenhuma tarefa encontrada para/i)).toBeVisible();
    });
  });
  
  test.describe('Unhappy Path', () => {
    test('should display the error toast when trying to create an untitled task', async({ page }) => {
      await page.getByRole('button', { name: /adicionar tarefa/i }).click();
  
      await expect(page.getByText('O título da tarefa é obrigatório')).toBeVisible();
    });
  });

});