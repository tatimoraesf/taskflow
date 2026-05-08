import { test, expect } from '@playwright/test';

test.describe('Tarefas', () => {
  test('deve criar uma tarefa com sucesso', async ({ page}) => {
    await page.goto('/');
    await page.getByPlaceholder("Ex: Estudar Typescript").fill('Nova Tarefa');
    await page.getByRole('button', { name: /adicionar tarefa/i }).click();

    await expect(page.getByText('Tarefa adicionada com sucesso!')).toBeVisible()
    await expect(page.getByText('Nova Tarefa')).toBeVisible();
  });
});