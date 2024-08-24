import { userRepository } from '../repositories/user';
import { v4 as uuidv4 } from 'uuid';

/**
 * User service to handle logic and return data
 */
class UserService {
  async findById(userId: string) {
    const data = await userRepository.findById(userId);

    return data.Item || undefined;
  }

  async findBySessionId(sessionId: string) {
    const data = await userRepository.findBySessionId(sessionId);
    console.log('data findBySessionId', data);

    return data.Items ? data.Items[0] : undefined;
  }

  async create(user: User) {
    const userId = uuidv4();

    return await userRepository.create({ ...user, userId });
  }

  async login(sessionId: string): Promise<{ userId: string; sessionId: string }> {
    const user = await this.findBySessionId(sessionId);
    let userId = user?.userId;

    if (!user) {
      const createdUser = await this.create({
        sessionId
      })

      userId = createdUser.userId;
    }

    return { sessionId, userId };
  }
}

export const userService = new UserService();
