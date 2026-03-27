import { useState } from 'react';
import type { Task } from '../types/task.types';
import { Trash2, Pencil } from 'lucide-react';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityLabel = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta'
}

function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className={`task-card ${task.done ? 'task-card--done' : ''} ${confirming ? 'task-card--confirm-active' : ''}`}>
      <input
        type="checkbox"
        className="task-card__checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-card__info">
        <h3 className="task-card__title">{task.title}</h3>
        {task.description && (
          <p className="task-card__description">{task.description}</p>
        )}
      </div>
      <span className={`task-card__priority task-card__priority--${task.priority}`}>{priorityLabel[task.priority]}</span>

      <div className="task-card__actions">
        {confirming ? (
          <>
            <button
              className="task-card__action task-card__action--confirm"
              onClick={() => onDelete(task.id)}
            >
              Confirmar
            </button>
            <button
              className="task-card__action task-card__action--cancel"
              onClick={() => setConfirming(false)}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              className="task-card__action"
              onClick={() => onEdit(task)}
              aria-label="Editar tarefa"
            >
              <Pencil size={15} />
            </button>
            <button
              className="task-card__action task-card__action--delete"
              onClick={() => setConfirming(true)}
              aria-label="Deletar tarefa"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TaskCard;