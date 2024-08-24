interface Task {
  state: 'done' | 'pending';
  todo: string;
  createdAt: number;
  id?: string;
  userId?: string;
}
