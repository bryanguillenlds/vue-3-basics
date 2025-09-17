export interface Task {
  id: number;
  name: string;
  completedAt: Date | null;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}
