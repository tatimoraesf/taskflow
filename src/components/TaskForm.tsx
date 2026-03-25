import type { TaskPriority } from '../types/task.types';
import './TaskForm.css';
import toast from 'react-hot-toast';

interface TaskFormProps {
  onAddTask: (title: string, priority: TaskPriority, description?: string) => void
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = (formData.get('title') as string).trim();
    const priority = formData.get('priority') as TaskPriority;
    const description = (formData.get('description') as string).trim();

    if (!title) {
      toast.error('O título da tarefa é obrigatório')
      return;
    }
    onAddTask(title, priority, description || undefined)
    e.currentTarget.reset();
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__field">
        <label htmlFor="title">Título da tarefa</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Ex: Estudar Typescript"
          required
        />
      </div>

      <div className="task-form__field">
        <label htmlFor="priority">Prioridade</label>
        <select id="priority" name="priority" defaultValue="medium">
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <div className="task-form__field">
        <label htmlFor="description">Descrição (opcional)</label>
        <textarea id="description" name="description" placeholder="Adicione detalhes sobre a tarefa" rows={3} />
      </div>

      <button type="submit" className="task-form__submit">
        Adicionar Tarefa
      </button>
    </form>
  )
}

export default TaskForm;