import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Pencil, Trash2, X } from 'lucide-react';
import type { Task, TaskPriority } from '../types/task.types';
import './TaskEditModal.css';

interface TaskEditModalProps {
  task: Task;
  onSave: (id: string, title: string, priority: TaskPriority, description?: string) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
}

function TaskEditModal({ task, onSave, onClose, onDelete }: TaskEditModalProps) {
  const [title, setTitle] = useState(task.title)
  const [priority, setPriority] = useState<TaskPriority>(task.priority)
  const [description, setDescription] = useState(task.description ?? '')
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(task.id, title, priority, description || undefined);
      setIsEditing(false);
    }
  }

  const handleCancelEdit = () => {
    setTitle(task.title);
    setPriority(task.priority);
    setDescription(task.description ?? '');
    setIsEditing(false);
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__actions-left">
            <button 
              type="button" 
              className={`modal__action-btn modal__action-btn--delete ${isConfirmingDelete ? 'active' : ''}`}
              onClick={() => setIsConfirmingDelete(!isConfirmingDelete)}
              aria-label="Excluir tarefa"
            >
              <Trash2 size={20} />
            </button>
            <button 
              type="button" 
              className={`modal__action-btn ${isEditing ? 'active' : ''}`}
              onClick={() => setIsEditing(!isEditing)}
              aria-label="Editar tarefa"
            >
              <Pencil size={20} />
            </button>
          </div>
          
          <button className="modal__close" onClick={onClose} aria-label="Fechar modal">
            <X size={20} />
          </button>
        </div>

        {isConfirmingDelete && (
          <div className="modal__delete-overlay">
            <div className="modal__delete-confirm-box">
              <p>Deseja excluir esta tarefa?</p>
              <div className="modal__delete-actions">
                <button 
                  type="button" 
                  className="modal__btn modal__btn--confirm-delete"
                  onClick={() => onDelete(task.id)}
                >
                  Sim, Excluir
                </button>
                <button 
                  type="button" 
                  className="modal__btn modal__btn--cancel-delete"
                  onClick={() => setIsConfirmingDelete(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="modal__field">
            <label htmlFor="edit-title">Título</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              readOnly={!isEditing}
              className={!isEditing ? 'readonly' : ''}
              autoFocus={isEditing}
            />
          </div>

          <div className="modal__field">
            <label htmlFor="edit-priority">Prioridade</label>
            <select
              id="edit-priority"
              value={priority}
              onChange={e => setPriority(e.target.value as TaskPriority)}
              disabled={!isEditing}
              className={!isEditing ? 'readonly' : ''}
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
              placeholder={isEditing ? "Adicione uma descrição detalhada..." : "Sem descrição"}
              rows={4}
              readOnly={!isEditing}
              className={!isEditing ? 'readonly' : ''}
            />
          </div>

          <div className="modal__footer">
            <div className="modal__footer-right" style={{ width: '100%', justifyContent: 'flex-end' }}>
              {isEditing && (
                <>
                  <button type="button" className="modal__btn modal__btn--cancel" onClick={handleCancelEdit}>
                    Cancelar
                  </button>
                  <button type="submit" className="modal__btn modal__btn--save">
                    Salvar Alterações
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}

export default TaskEditModal;