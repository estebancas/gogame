import { Request, Response } from 'express';

import { taskService } from '../services/task';

/**
 * Task controller to format http responses and request handling
 */
class TaskController {
  async create(req: Request, res: Response) {
    const userId = req.session.userId;

    if (userId) {
      const data = await taskService.create(req.body, userId);
      res.json(data);
    }
  }

  async delete(req: Request, res: Response) {
    const userId = req.session.userId;

    if (userId) {
      const id = req.params.id;

      const data = await taskService.delete(id);
      res.json(data);
    }
  }

  async update(req: Request, res: Response) {
    const userId = req.session.userId;

    if (userId) {
      const id = req.params.id;
      const payload = req.body;

      const data = await taskService.update(id, payload);
      res.json(data);
    }
  }

  async getAll(req: Request, res: Response) {
    const userId = req.session.userId;

    if (userId) {
      const data = await taskService.getUserTasks(userId);
      res.json(data);
    }
  }
}

export const taskController = new TaskController();
