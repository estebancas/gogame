import { httpService } from '.';

export const createTask = async (task: Task) => {
  return await httpService.request('POST', 'tasks', task);
};

export const deleteTask = async (id: string) => {
  return await httpService.request('DELETE', `tasks/${id}`);
};

export const updateTask = async (id: string, payload: Task) => {
  return await httpService.request('PUT', `tasks/${id}`, payload);
};

export const getAllTask = async () => {
  return await httpService.request('GET', 'tasks');
};
