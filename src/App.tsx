import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import ProgressBar from './components/ProgressBar';
import TaskEditModal from './components/TaskEditModal';
import './App.css';
import EmptyState from './components/EmptyState';
import toast, { Toaster } from 'react-hot-toast';
import { useTasks } from './hooks/useTasks';
import { SearchBar } from './components/SearchBar';

function App() {
  const {
    tasks,
    editingTask,
    setEditingTask,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    searchQuery,
    setSearchQuery
  } = useTasks();

  return (
    <div className="app-container">

      <h1>TaskFlow</h1>

      <ProgressBar
        total={tasks.length}
        done={tasks.filter(task => task.done).length}
      />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className="full-width-container">
        <TaskForm onAddTask={addTask} />
      </div>

      <div className="full-width-container">
        {tasks.length === 0 && searchQuery === "" && (
          <EmptyState />
        )}
        {tasks.length === 0 && searchQuery !== "" && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              🔍 Nenhuma tarefa encontrada para <strong>"{searchQuery}"</strong>
            </p>
            <button onClick={() => setSearchQuery("")} className="mt-2 text-purple-600 hover:underline text-sm">
              Limpar busca
            </button>
          </div>
        )}
        {tasks.length > 0 && (
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