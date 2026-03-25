import './EmptyState.css'

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">📝</div>
      <h3 className="empty-state__title">Nenhuma tarefa por aqui</h3>
      <p className="empty-state__description">
        Que tal começar o dia organizando suas metas? Adicione uma tarefa acima!
      </p>
    </div>
  )
}

export default EmptyState
