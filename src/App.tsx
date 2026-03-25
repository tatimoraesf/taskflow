import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import ProgressBar from './components/ProgressBar';
import TaskEditModal from './components/TaskEditModal';
import './App.css';
import EmptyState from './components/EmptyState';
import toast, { Toaster } from 'react-hot-toast';
import { useTasks } from './hooks/useTasks';

function App() {
  const {
    tasks,
    editingTask,
    setEditingTask,
    addTask,
    toggleTask,
    deleteTask,
    editTask
  } = useTasks();

  return (
    <div className="app-container">

      <h1>TaskFlow</h1>

      <ProgressBar
        total={tasks.length}
        done={tasks.filter(task => task.done).length}
      />
      <div className="full-width-container">
        <TaskForm onAddTask={addTask} />
      </div>

      <div className="full-width-container">
        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={setEditingTask}
            />
          ))
        )}
      </div>
      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onSave={editTask}
          onClose={() => setEditingTask(null)}
        />
      )}
      <Toaster />
    </div>
  )
}


export default App;