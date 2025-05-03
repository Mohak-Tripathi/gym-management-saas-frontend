// lib/services/request.ts
import api from './api';

export const getRequest = async (
  url: string,
  queryParams?: Record<string, any>
) => {
  try {
    const response = await api.get(url, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};
