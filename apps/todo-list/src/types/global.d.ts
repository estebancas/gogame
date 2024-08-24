interface User {
  sessionId: string;
  userId: string;
}

interface Task {
  state: 'done' | 'pending';
  todo: string;
  createdAt?: number;
  id?: string;
  userId?: string;
}

// Store state
interface State {
  user?: User;
  tasks: Task[];
}

interface StateActionCreators {
  addTask: (todo: Task) => Promise<void>;
  removeTask: (id?: string) => Promise<void>;
  completeTask: (id?: string) => Promise<void>;
}

interface StateSelector {
  pendingTasks: Task[];
}
