// lib/services/request.ts
import api from './api';


const getFullUrl = (url: string) => {
  // If url already starts with http, return as is
  if (/^https?:\/\//.test(url)) return url;
  // Otherwise, prepend the base URL
  const base = process.env.NEXT_PUBLIC_API_URL || '';
  // Ensure no double slashes
  return `${base.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
};

export const getRequest = async (
  url: string,
  queryParams?: Record<string, any>
) => {
  try {
    const response = await api.get(getFullUrl(url), { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};


// ... existing code ...
export const postRequest = async (
  url: string,
  data: Record<string, any>
) => {
  try {
    const response = await api.post(getFullUrl(url), data);
    return response.data;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};

// put request
export const putRequest = async (
  url: string,
  data: Record<string, any>
) => {
  try {
    const response = await api.put(getFullUrl(url), data);
    return response.data;
  } catch (error) {
    console.error('put request error:', error);
    throw error;
  }
};

// delete request
export const deleteRequest = async (
  url: string,
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(getFullUrl(url));
    return response.data;
  } catch (error) {
    console.error('delete request error:', error);
    throw error;
  }
};

