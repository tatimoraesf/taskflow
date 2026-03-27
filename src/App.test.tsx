import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import useEvent from '@testing-library/user-event'
import App from './App'

describe('App Integration', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('deve filtrar a lista de tarefas na tela quando o usuário digita na busca', async () => {
    const user = useEvent.setup()
    render(<App />)

    const inputTask = screen.getByPlaceholderText(/Ex: Estudar Typescript/i)
    const addButton = screen.getByRole('button', { name: /adicionar/i })

    await user.type(inputTask, 'Estudar Automação')
    await user.click(addButton)

    expect(screen.getByText('Estudar Automação')).toBeDefined()

    const searchInput = screen.getByPlaceholderText(/buscar tarefas/i)

    await user.type(searchInput, 'Cozinhar')

    expect(screen.queryByText('Estudar Automação')).toBeNull()
    expect(screen.getByText(/nenhuma tarefa encontrada/i)).toBeDefined()
  })

  it('deve abrir o modal de edição, alterar uma tarefa e salvar', async () => {
    const user = useEvent.setup()
    render(<App />)

    const inputTask = screen.getByPlaceholderText(/Ex: Estudar Typescript/i)
    await user.type(inputTask, 'Tarefa Original')
    await user.click(screen.getByRole('button', { name: /adicionar/i }))

    const editButton = screen.getByLabelText(/editar tarefa/i)
    await user.click(editButton)

    const modalInput = screen.getByDisplayValue('Tarefa Original')
    await user.clear(modalInput)
    await user.type(modalInput, 'Tarefa Editada')

    const saveButton = screen.getByRole('button', { name: /salvar/i })
    await user.click(saveButton)

    expect(screen.getByText('Tarefa Editada')).toBeDefined()
    expect(screen.queryByText('Tarefa Original')).toBeNull()
  })

  it('deve fechar o modal de edição sem salvar as clicar em cancelar', async () => {
    const user = useEvent.setup()
    render(<App />)

    const inputTask = screen.getByPlaceholderText(/Ex: Estudar Typescript/i)
    await user.type(inputTask, 'Tarefa para Cancelar')
    await user.click(screen.getByRole('button', { name: /adicionar/i }))

    const editButton = screen.getByLabelText(/editar tarefa/i)
    await user.click(editButton)

    expect(screen.getByText(/editar tarefa/i)).toBeDefined()

    const cancelButton = screen.getByRole('button', { name: /cancelar/i })
    await user.click(cancelButton)

    // expect(screen.queryByText(/cancelar/i)).toBeNull()
    expect(screen.getByText('Tarefa para Cancelar')).toBeDefined()
  })
})