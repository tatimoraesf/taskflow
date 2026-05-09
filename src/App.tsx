import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import ProgressBar from './components/ProgressBar';
import './App.css';
import EmptyState from './components/EmptyState';
import { Toaster } from 'react-hot-toast';
import { useTasks } from './hooks/useTasks';
import { SearchBar } from './components/SearchBar';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('taskflow-theme');
    if (saved) return saved as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('taskflow-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    searchQuery,
    setSearchQuery
  } = useTasks();

  return (
    <div className="app-container">
      <header className="app-header">
        <button 
          onClick={toggleTheme} 
          className="theme-toggle"
          aria-label="Alternar tema"
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
        <div className="app-header__main">
          <h1>TaskFlow</h1>
          <p className="app-subtitle">Gerencie suas tarefas do dia</p>
        </div>
      </header>

      <ProgressBar
        total={tasks.length}
        done={tasks.filter(task => task.done).length}
      />

      <main>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="content-row">
          <aside className="sidebar">
            <TaskForm onAddTask={addTask} />
          </aside>

          <section className="tasks-section">
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
                  onSave={editTask}
                />
              ))
            )}
          </section>
        </div>
      </main>

      <Toaster />
    </div>
  )
}

export default App;