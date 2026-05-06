import type { Task, TaskPriority } from '../types/task.types';
import './TaskCard.css';
import TaskEditModal from './TaskEditModal';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onSave: (id: string, title: string, priority: TaskPriority, description?: string) => void;
  onDelete: (id: string) => void;
}

const priorityLabel = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta'
}

function TaskCard({ task, onToggle, onSave, onDelete }: TaskCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div 
      className={`task-card ${task.done ? 'task-card--done' : ''}`}
      onClick={() => setIsModalOpen(true)}
      role="button"
      tabIndex={0}
    >
      <input
        type="checkbox"
        className="task-card__checkbox"
        checked={task.done}
        onChange={(e) => {
          e.stopPropagation();
          onToggle(task.id);
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="task-card__info">
        <h3 className="task-card__title">{task.title}</h3>
        {task.description && (
          <p className="task-card__description">{task.description}</p>
        )}
      </div>
      <span className={`task-card__priority task-card__priority--${task.priority}`}>{priorityLabel[task.priority]}</span>
      {isModalOpen && (
        <TaskEditModal
          task={task}
          onClose={() => setIsModalOpen(false)}
          onSave={(id, t, p, d) => {
            onSave(id, t, p, d);
            setIsModalOpen(false);
          }}
          onDelete={(id) => {
            onDelete(id);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  )
}

export default TaskCard;