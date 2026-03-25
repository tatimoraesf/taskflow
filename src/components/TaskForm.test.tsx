import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TaskForm from './TaskForm'

describe('TaskForm', () => {
  it('deve adicionar tarefa quando formulário é submetido', async () => {
    const mockAddTask = vi.fn()
    const user = userEvent.setup()
    render(<TaskForm onAddTask={mockAddTask} />)

    await user.type(screen.getByLabelText('Título da tarefa'), 'Nova tarefa')
    await user.selectOptions(screen.getByLabelText('Prioridade'), 'high')
    await user.click(screen.getByText('Adicionar Tarefa'))

    expect(mockAddTask).toHaveBeenCalledWith('Nova Tarefa', 'high')
    expect(mockAddTask).toHaveBeenCalledTimes(1)
  })

  it('não deve adicionar tarefa com título vazio', async () => {

    const mockAddTask = vi.fn()
    const user = userEvent.setup()
    render(<TaskForm onAddTask={mockAddTask} />)

    await user.click(screen.getByText('Adicionar Tarefa'))

    expect(mockAddTask).not.toHaveBeenCalled()
  })

  it('deve limpar formulário após submissão', async () => {

    const mockAddTask = vi.fn()
    const user = userEvent.setup()
    render(<TaskForm onAddTask={mockAddTask} />)

    const input = screen.getByLabelText('Título da tarefa') as HTMLInputElement
    await user.type(input, 'Tarefa Teste')
    await user.click(screen.getByText('Adicionar Tarefa'))

    expect(input.value).toBe('')
  })
})