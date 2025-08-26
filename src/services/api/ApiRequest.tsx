import axios, {AxiosRequestConfig, Method} from 'axios';

interface ApiRequestProps {
  BaseUrl: string;
  method?: Method; // 'GET' | 'POST' | 'PUT' | 'DELETE' | etc.
  request?: Record<string, any> | FormData;
  isMultipart?: boolean;
}



const ApiRequest = async <T = any,>({
  BaseUrl,
  method = 'GET',
  request = {},
  isMultipart = false,
}: ApiRequestProps): Promise<T> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    };

    const config: AxiosRequestConfig = {
      method,
      url: BaseUrl,
      headers,
      ...(method !== 'GET' && {data: request}),
    };

    const response = await axios(config);
    return response.data as T;
  } catch (error: any) {
    console.error('API Error:', error?.response || error);
    throw error?.response?.data || error;
  }
};

export default ApiRequest;
