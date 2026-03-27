import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTasks } from './useTasks'

describe('useTasks', () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.clearAllMocks()
  })

  it('deve adicionar uma nova tarefa com sucesso', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask('Nova Tarefa Portfólio', 'high', 'Descrição detalhada')
    })

    expect(result.current.tasks).toHaveLength(1)

    expect(result.current.tasks[0].title).toBe('Nova Tarefa Portfólio')
    expect(result.current.tasks[0].priority).toBe('high')
  })

  it('não deve adicionar tarefa se o título estiver vazio ou apenas com espaços', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask('   ', 'low')
    })

    expect(result.current.tasks).toHaveLength(0)
  })

  it('deve remover uma tarefa da lista', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask('Tarefa para deletar', 'low')
    })

    const taskId = result.current.tasks[0].id

    act(() => {
      result.current.deleteTask(taskId)
    })

    expect(result.current.tasks).toHaveLength(0)
  })

  it('deve verificar se a tarefa está concluída', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask('Tarefa para concluir', 'medium')
    })

    const taskId = result.current.tasks[0].id

    act(() => {
      result.current.toggleTask(taskId)
    })

    expect(result.current.tasks[0].done).toBe(true)

    act(() => {
      result.current.toggleTask(taskId)
    })

    expect(result.current.tasks[0].done).toBe(false)
  })

  it('deve editar uma tarefa existente', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask('Tarefa Antiga', 'low')
    })

    const taskId = result.current.tasks[0].id

    act(() => {
      result.current.editTask(taskId, 'Tarefa Editada', 'high', 'Adicionando uma descrição')
    })

    expect(result.current.tasks[0].title).toBe('Tarefa Editada')
    expect(result.current.tasks[0].priority).toBe('high')
    expect(result.current.tasks[0].description).toBe('Adicionando uma descrição')
  })

  it('deve manter as tarefas concluídas ao final da lista (ordenação)', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask('Tarefa 1', 'low')
    })

    act(() => {
      result.current.addTask('Tarefa 2', 'high')
    })

    const tarefa1 = result.current.tasks.find(t => t.title === 'Tarefa 1')

    expect(tarefa1).toBeDefined()

    act(() => {
      result.current.toggleTask(tarefa1!.id)
    })

    expect(result.current.tasks[0].title).toBe('Tarefa 2')
    expect(result.current.tasks[1].title).toBe('Tarefa 1')
    expect(result.current.tasks[1].done).toBe(true)
  })

  it('deve gerenciar o estado de edição(editingTask)', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask('Tarefa teste', 'low')
    })

    const task = result.current.tasks[0]

    act(() => {
      result.current.setEditingTask(task)
    })

    expect(result.current.editingTask).toEqual(task)

    act(() => {
      result.current.editTask(task.id, 'Novo Nome', 'high')
    })

    expect(result.current.editingTask).toBeNull()


  })
})