import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { db } from '../utils/database';

/**
 * Task repository to hide complexity for data access and storage
 */
class TaskRepository {
  table: string;

  constructor() {
    this.table = 'Tasks';
  }

  async findById(id: string) {
    const params: DocumentClient.GetItemInput = {
      TableName: this.table,
      Key: {
        id,
      },
    };

    return await db.get(params).promise();
  }

  async create(task: Task) {
    const params: DocumentClient.PutItemInput = {
      TableName: this.table,
      Item: task,
    };

    await db.put(params).promise();

    return params.Item;
  }

  async delete(id: string) {
    const params: DocumentClient.DeleteItemInput = {
      TableName: this.table,
      Key: {
        id,
      }
    }

    return await db.delete(params).promise();
  }

  async update(id: string, task: Task) {
    const params: DocumentClient.UpdateItemInput = {
      TableName: this.table,
      Key: {
        id,
      },
      UpdateExpression: "set #st = :s, todo = :t",
      ExpressionAttributeValues: {
        ":s": task.state,
        ":t": task.todo,
      },
      ExpressionAttributeNames: {
        "#st": "state"
      },
      ReturnValues: "ALL_NEW",
    }

    return await db.update(params).promise();
  }

  async getAllByUserId(userId: string) {
    /**
     * Important funtion here, returns all tasks for a giving user, using GSI
     * for querying performance
     */
    const params: DocumentClient.QueryInput = {
      TableName: this.table,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: {
        ":uid": userId,
      },
      IndexName: "userId-index",
    }

    return await db.query(params).promise();
  }
}

export const taskRepository = new TaskRepository();
