import type { TaskStatus, TaskPriority } from '../types/task.types';
import './TaskForm.css';

interface TaskFormProps {
  onAddTask: (title: string, status: TaskStatus, priority: TaskPriority) => void
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const status = formData.get('status') as TaskStatus;
    const priority = formData.get('priority') as TaskPriority;

    if (title.trim()) {
      onAddTask(title, status, priority)
      e.currentTarget.reset();
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
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

      <div className="task-form__row">
        <div className="task-form__field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue="todo">
            <option value="todo">A fazer</option>
            <option value="in-progress">Em progresso</option>
            <option value="done">Concluído</option>
          </select>
        </div>

        <div className="task-from__field">
          <label htmlFor="priority">Prioridade</label>
          <select id="priority" name="priority" defaultValue="medium">
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
      </div>
      <button type="submit" className="task-form__submit">
        Adicionar Tarefa
      </button>
    </form>
  )
}

export default TaskForm;