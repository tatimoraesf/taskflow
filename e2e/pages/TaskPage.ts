import { Page } from '@playwright/test';

export class TaskPage {
  constructor(private page: Page) {}

  async createTask(title: string) {
    await this.page.getByPlaceholder("Ex: Estudar Typescript").fill(title);
    await this.page.getByRole('button', { name: /adicionar tarefa/i }).click();
  }

  async editTask(newTitle: string) {
      await this.page.getByLabel('editar tarefa').click();
      await this.page.locator('[aria-label="Editar tarefa"]').click();
      await this.page.locator('.modal').getByLabel('Título').fill(newTitle);
      await this.page.getByRole('button', { name: /salvar alterações/i }).click();
  }

  async deleteTask() {
    await this.page.getByLabel('editar tarefa').click();
    await this.page.locator('[aria-label="Excluir tarefa"]').click();
    await this.page.getByRole('button', { name: /sim, excluir/i }).click();
  }
}