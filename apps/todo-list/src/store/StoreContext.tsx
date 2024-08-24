import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  Dispatch,
} from 'react';

import { authenticateUser } from '../api/user';
import { createTask, deleteTask, getAllTask, updateTask } from '../api/tasks';

/**
 * Simple Context API store for tasks and user
 */

const initialState: State = {
  tasks: [],
};

// Actions for the User and Task reducer
type Action =
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'FULFILL_TASKS'; payload: Task[] }
  | { type: 'REMOVE_TASK'; payload: string };

interface StoreContextInterface extends StateActionCreators, StateSelector {
  state: State;
  dispatch: Dispatch<Action>;
}

// Create context
const StoreContext = createContext<StoreContextInterface>({
  addTask: async (task: Task) => {
    return;
  },
  removeTask: async (id?: string) => {
    return;
  },
  completeTask: async (id?: string) => {
    return;
  },
  dispatch: () => {
    return;
  },
  pendingTasks: [],
  state: initialState,
});

const userReducer = (state: State['user'], action: Action): State['user'] => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
};

const tasksReducer = (
  state: State['tasks'],
  action: Action
): State['tasks'] => {
  switch (action.type) {
    case 'FULFILL_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [action.payload, ...state];
    case 'COMPLETE_TASK':
      return state.map((task) =>
        task.id === action.payload ? { ...task, state: 'done' } : task
      );
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

// Store reducers
const combinedReducer = (state: State, action: Action): State => ({
  user: userReducer(state.user, action),
  tasks: tasksReducer(state.tasks, action),
});

const StoreProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(combinedReducer, initialState);

  // Get all user tasks
  const fetchTasks = async () => {
    const response = await getAllTask();

    console.log('reponse', response);

    if (response) {
      dispatch({
        type: 'FULFILL_TASKS',
        payload: response,
      });
    }
  };

  const handleUserAuthentication = async () => {
    const response = await authenticateUser();
    console.log('response', response);

    if (response) {
      dispatch({
        type: 'SET_USER',
        payload: response,
      });

      fetchTasks();
    }
  };

  useEffect(() => {
    // If user doesnt have a session yet
    if (!state.user) {
      handleUserAuthentication();
    }
  }, [state.user]);

  // Selector for pending tasks only
  const pendingTasks = useMemo(() => {
    return state.tasks.filter((task) => task.state !== 'done');
  }, [state]);

  // Create a task and hydrate state
  const addTask = async (task: Task) => {
    const response = await createTask(task);

    console.log('response', response);

    if (response) {
      dispatch({
        type: 'ADD_TASK',
        payload: response,
      });
    }
  };

  // Remove task and clear state
  const removeTask = async (id?: string) => {
    if (id) {
      const response = await deleteTask(id);

      if (response) {
        dispatch({
          type: 'REMOVE_TASK',
          payload: id,
        });
      }
    }
  };

  // Complete task and hydrate state
  const completeTask = async (id?: string) => {
    if (id) {
      const task = state.tasks.find((task) => task.id === id);

      if (task) {
        const response = await updateTask(id, { ...task, state: 'done' });

        if (response) {
          dispatch({
            type: 'COMPLETE_TASK',
            payload: id,
          });
        }
      }
    }
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        pendingTasks,
        addTask,
        removeTask,
        completeTask,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Expose the use context
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
