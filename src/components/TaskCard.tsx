import type { Task } from '../types/task.types';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="task-card">
      <h3 className="task-card__title">{task.title}</h3>
      <div className="task-card__metadata">
        <span className="task-card__badge task-card__badge--status">{task.status}</span>
        <span className="task-card__badge task-card__badge--priority">{task.priority}</span>
      </div>
    </div>
  )
}

export default TaskCard;
