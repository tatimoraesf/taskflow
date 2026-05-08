import { test, expect } from '@playwright/test';

test.describe('Tarefas', () => {
  test('deve criar uma tarefa com sucesso', async ({ page}) => {
    await page.goto('/');
    await page.getByPlaceholder("Ex: Estudar Typescript").fill('Nova Tarefa');
    await page.getByRole('button', { name: /adicionar tarefa/i }).click();

    await expect(page.getByText('Tarefa adicionada com sucesso!')).toBeVisible()
    await expect(page.getByText('Nova Tarefa')).toBeVisible();
  });

  test('deve editar uma tarefa com sucesso', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder("Ex: Estudar Typescript").fill('Tarefa para Editar');
    await page.getByRole('button', { name: /adicionar tarefa/i }).click();

    await page.getByLabel('editar tarefa').click();
    await page.locator('[aria-label="Editar tarefa"]').click();
    await page.locator('.modal').getByLabel('Título').fill('Tarefa Editada');
    await page.getByRole('button', { name: /salvar alterações/i }).click();

    await expect(page.getByText('Tarefa atualizada com sucesso!')).toBeVisible();
    await expect(page.getByText('Tarefa Editada')).toBeVisible();
  });

  test('deve excluir uma tarefa com sucesso', async ({page}) => {
    await page.goto('/');
    await page.getByPlaceholder("Ex: Estudar Typescript").fill('Tarefa para Excluir');
    await page.getByRole('button', { name: /adicionar tarefa/i }).click();

    await page.getByLabel('editar tarefa').click();
    await page.locator('[aria-label="Excluir tarefa"]').click();
    await page.getByRole('button', { name: /sim, excluir/i }).click();

    await expect(page.getByText('Tarefa excluída com sucesso!')).toBeVisible();
    await expect(page.getByText('Tarefa para Excluir')).not.toBeVisible();
  });
});