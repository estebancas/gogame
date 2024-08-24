import { v4 as uuidv4 } from 'uuid';

import { taskRepository } from '../repositories/taks';

/**
 * Task service to handle logic and return data
 */
class TaskService {
  async create(task: Task, userId: string) {
    const taskId = uuidv4();
    return taskRepository.create({
      ...task,
      userId,
      createdAt: new Date().getTime(),
      id: taskId,
    });
  }

  async delete(id: string) {
    return await taskRepository.delete(id);
  }

  async update(id: string, task: Task) {
    return await taskRepository.update(id, task);
  }

  async getUserTasks(userId: string) {
    const data = await taskRepository.getAllByUserId(userId);

    if (data) {
      return data.Items
    }
  }
}

export const taskService = new TaskService();
