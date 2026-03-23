import { useState } from 'react';
import type { Task, TaskPriority } from './types/task.types';
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import ProgressBar from './components/ProgressBar';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow-tasks', [])

  const handleAddTask = (title: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      done: false,
      priority,
      createdAt: new Date(),
    }

    setTasks([...tasks, newTask])
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, done: !task.done, completedAt: !task.done ? new Date() : undefined }
        : task
    ))
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.done === b.done) return 0;
    return a.done ? 1 : -1;
  })

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div style={{
      width: '600px',
      margin: '0 auto',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>

      <h1>TaskFlow</h1>

      <ProgressBar
        total={tasks.length}
        done={tasks.filter(task => task.done).length}
      />
      <div style={{ width: '100%' }}>
        <TaskForm onAddTask={handleAddTask} />
      </div>

      <div style={{ width: '100%' }}>
        {sortedTasks.map(task => (
          <TaskCard key={task.id} task={task} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
        ))}
      </div>
    </div>
  )
}


export default App;