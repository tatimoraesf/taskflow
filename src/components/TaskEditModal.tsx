import { useState } from 'react';
import type { Task, TaskPriority } from '../types/task.types';
import './TaskEditModal.css';

interface TaskEditModalProps {
  task: Task;
  onSave: (id: string, title: string, priority: TaskPriority, description?: string) => void;
  onClose: () => void;
}

function TaskEditModal({ task, onSave, onClose }: TaskEditModalProps) {
  const [title, setTitle] = useState(task.title)
  const [priority, setPriority] = useState<TaskPriority>(task.priority)
  const [description, setDescription] = useState(task.description ?? '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(task.id, title, priority, description || undefined)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Editar tarefa</h2>
          <button className="modal__close" onClick={onClose}>X</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal__field">
            <label htmlFor="edit-title">Título</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="modal__field">
            <label htmlFor="edit-priority">Prioridade</label>
            <select
              id="edit-priority"
              value={priority}
              onChange={e => setPriority(e.target.value as TaskPriority)}
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div className="modal__field">
            <label htmlFor="edit-description">Descrição</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Adicione uma descrição"
              rows={3}
            />
          </div>

          <div className="modal__footer">
            <button type="button" className="modal__btn modal__btn--cancel" onClick={onClose} >
              Cancelar
            </button>
            <button type="submit" className="modal__btn modal__btn--save">
              Salvar
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default TaskEditModal;