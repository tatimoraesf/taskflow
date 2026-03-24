import { useState } from 'react';
import type { Task, TaskPriority } from './types/task.types';
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import ProgressBar from './components/ProgressBar';
import TaskEditModal from './components/TaskEditModal';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow-tasks', [])
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (title: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      done: false,
      priority,
      createdAt: new Date(),
    }

    setTasks([newTask, ...tasks])
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, done: !task.done, completedAt: !task.done ? new Date() : undefined }
        : task
    ))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleEditTask = (id: string, title: string, priority: TaskPriority, description?: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, title, priority, description } : task
    ))
    setEditingTask(null);
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.done === b.done) return 0;
    return a.done ? 1 : -1;
  })

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
          <TaskCard
            key={task.id}
            task={task}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={setEditingTask}
          />
        ))}
      </div>
      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onSave={handleEditTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  )
}


export default App;