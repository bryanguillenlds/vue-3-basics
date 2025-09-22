import type { Project } from '@/modules/projects/interfaces/project.interface';

export const projectsMock: Project[] = [
  {
    id: '1',
    name: 'Test Project 1',
    tasks: [
      { id: '1', name: 'Test Task 1', completedAt: null },
      { id: '2', name: 'Test Task 2', completedAt: new Date() },
      { id: '3', name: 'Test Task 3', completedAt: null }
    ]
  },
  { id: '2', name: 'Test Project 2', tasks: [] },
  { id: '3', name: 'Test Project 3', tasks: [] },
  {
    id: '4',
    name: 'Test Project 4',
    tasks: [
      { id: '1', name: 'Test Task 1', completedAt: new Date() },
      { id: '2', name: 'Test Task 2', completedAt: null },
      { id: '3', name: 'Test Task 3', completedAt: null }
    ]
  },
  { id: '5', name: 'Test Project 5', tasks: [] }
];
