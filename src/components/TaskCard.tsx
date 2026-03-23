import type { Task } from '../types/task.types';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

function TaskCard({ task, onToggle }: TaskCardProps) {
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
    </div>
  )
}

export default TaskCard;
