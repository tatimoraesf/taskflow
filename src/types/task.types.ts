export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: TaskPriority;
  createdAt: Date;
  completedAt?: Date;
  description?: string;
}