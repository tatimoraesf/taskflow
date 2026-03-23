import type { Task } from '../types/task.types';
import './TaskCard.css';
import { Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div
      className={`task-card ${task.done ? 'task-card--done' : ''}`}>
      <input
        type="checkbox"
        className="task-card__checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-card__content">
        <h3 className="task-card__title">{task.title}</h3>
        <span className="task-card__priority">{task.priority}</span>
      </div>
      <button
        className="task-card__delete"
        onClick={() => onDelete(task.id)}
        arial-label="Deletar tarefa"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

export default TaskCard;
