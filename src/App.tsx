import { useState } from 'react';
import type { Task, TaskPriority, TaskStatus } from './types/task.types';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Criar o projeto TaskFlow',
      status: 'done',
      priority: 'high',
      createdAt: new Date(),
    }
  ])
  const handleAddTask = (title: string, status: TaskStatus, priority: TaskPriority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status,
      priority,
      createdAt: new Date(),
    }

    setTasks([...tasks, newTask])
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>TaskFlow</h1>
      <TaskForm onAddTask={handleAddTask} />

      <div>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}


export default App;