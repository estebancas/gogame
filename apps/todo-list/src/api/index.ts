import axios, { Method } from 'axios';

const baseURL = 'http://localhost:3333/api/';

/**
 * Centralized Http Service to handle all network request
 */
class HttpService {
  async request<T>(method: Method, url: string, data?: T) {
    try {
      const response = await axios.request({
        headers: {
          'Content-Type': 'application/json',
        },
        method,
        url,
        baseURL,
        data,
      });

      // Successful
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Error message:', error.message);
      } else {
        console.log('Something wrong happend', error);
      }
    }
  }
}

export const httpService = new HttpService();
