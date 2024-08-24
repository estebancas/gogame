import { Request, Response } from 'express';

import { userService } from '../services/user';

/**
 * Task controller to format http responses and request handling
 */
class UserController {
  async login(req: Request, res: Response) {
    const sessionId = req.sessionID;

    const data = await userService.login(sessionId);

    if (data) {
      req.session.userId = data.userId
    }

    res.json(data)
  }

  async findById(req: Request, res: Response) {
    const data = await userService.findById(req.params.userId);

    res.json(data);
  }

  async create(req: Request, res: Response) {
    const data = await userService.create(req.body);

    res.json(data);
  }
}

export const userController = new UserController();
