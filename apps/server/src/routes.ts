import { Application, Request, Response, NextFunction } from 'express';

import { userController } from './controllers/user';
import { taskController } from './controllers/task';

/**
 * router hander
 * @param app Express.Application
 */
export const routes = async (app: Application) => {
  function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    // Checks if user session is already being created
    if (req.session.userId) {
      next();
    } else {
      res.statusCode = 400;
      res.json({ message: 'Unauthorized' });
    }
  }

  app.post('/api/users/auth', userController.login);
  app.get('/api/users/:userId', userController.findById);
  app.post('/api/tasks', isAuthenticated, taskController.create);
  app.delete('/api/tasks/:id', isAuthenticated, taskController.delete);
  app.put('/api/tasks/:id', isAuthenticated, taskController.update);
  app.get('/api/tasks', isAuthenticated, taskController.getAll);
};
