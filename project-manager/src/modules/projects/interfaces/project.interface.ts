export interface Task {
  id: string;
  name: string;
  completedAt: Date | null;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}
