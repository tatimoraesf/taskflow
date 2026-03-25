import { useState } from 'react'
import type { Task, TaskPriority } from '../types/task.types'
import { useLocalStorage } from './useLocalStorage'
import toast from 'react-hot-toast'

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow-tasks', [])
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = (title: string, priority: TaskPriority, description?: string) => {
    const cleanTitle = title.trim()

    if (cleanTitle === "") {
      toast.error("O título da tarefa é obrigatório")
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      done: false,
      priority,
      createdAt: new Date(),
      description,
    }


    setTasks([newTask, ...tasks]);
    toast.success('Tarefa adicionada com sucesso!')
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, done: !task.done, completedAt: !task.done ? new Date() : undefined }
        : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
    toast.success('Tarefa excluída com sucesso!')
  }

  const editTask = (id: string, title: string, priority: TaskPriority, description?: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, title, priority, description } : task
    ))
    setEditingTask(null);
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.done === b.done) return 0;
    return a.done ? 1 : -1;
  })

  return {
    tasks: sortedTasks,
    editingTask,
    setEditingTask,
    addTask,
    toggleTask,
    deleteTask,
    editTask
  }
}
