import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { db } from '../utils/database';

/**
 * User repository to hide complexity for data access and storage
 */
class UserRepository {
  table: string;

  constructor() {
    this.table = 'TaskUsers';
  }

  async findById(id: string) {
    const params: DocumentClient.GetItemInput = {
      TableName: this.table,
      Key: {
        userId: id,
      },
    };

    return await db.get(params).promise();
  }

  async findBySessionId(sessionId: string) {
    const params: DocumentClient.QueryInput = {
      TableName: this.table,
      KeyConditionExpression: 'sessionId = :sid',
      ExpressionAttributeValues: {
        ':sid': sessionId,
      },
      IndexName: 'sessionId-index',
    };

    return await db.query(params).promise();
  }

  async create(user: User) {
    const params: DocumentClient.PutItemInput = {
      TableName: this.table,
      Item: {
        userId: user.userId,
        sessionId: user.sessionId,
      },
    };

    await db.put(params).promise();

    return params.Item;
  }
}

export const userRepository = new UserRepository();
