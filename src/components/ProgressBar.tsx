import './ProgressBar.css';

interface ProgressBarProps {
  total: number;
  done: number;
}

function ProgressBar({ total, done }: ProgressBarProps) {
  if (total === 0) return null;

  const percentage = Math.round((done / total) * 100);

  return (
    <div className="progress">
      <div className="progress__header">
        <span className="progress__label">
          {done} de {total} tarefas concluídas
        </span>
        <span className="progress__percentage">{percentage}%</span>
      </div>
      <div className="progress__track">
        <div className="progress__bar" style={{ width: `${percentage}%` }} />

      </div>
    </div>
  )
}

export default ProgressBar;
