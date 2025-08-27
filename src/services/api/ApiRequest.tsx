import axios, {AxiosRequestConfig, Method} from 'axios';

interface ApiRequestProps {
  BaseUrl: string;
  method?: Method; // 'GET' | 'POST' | 'PUT' | 'DELETE' | etc.
  request?: Record<string, any> | FormData;
  isMultipart?: boolean;
  token?: string;
}

const ApiRequest = async <T = any,>({
  BaseUrl,
  method = 'GET',
  request = {},
  isMultipart = false,
  token,
}: ApiRequestProps): Promise<T> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

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

// import axios, {AxiosRequestConfig, Method} from 'axios';

// interface ApiRequestProps {
//   BaseUrl: string;
//   method?: Method; // 'GET' | 'POST' | 'PUT' | 'DELETE' etc.
//   req?: Record<string, any> | FormData;
//   token?: string;
//   isForm?: boolean;
// }

// interface ApiResponse<T = any> {
//   status: number;
//   data: T;
// }

// const ApiRequest = async <T = any,>({
//   BaseUrl,
//   method = 'POST',
//   req,
//   token,
//   isForm = false,
// }: ApiRequestProps): Promise<ApiResponse<T>> => {
//   try {
//     // 🔹 Build headers
//     const headers: Record<string, string> = {
//       'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
//     };

//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }

//     const config: AxiosRequestConfig = {
//       url: BaseUrl,
//       method,
//       headers,
//       ...(method !== 'GET' && {data: req}), // Only attach data for non-GET
//     };

//     const response = await axios(config);

//     return {
//       status: response.status,
//       data: response.data as T,
//     };
//   } catch (error: any) {
//     console.error('API Error:', error?.response?.data || error.message);

//     return {
//       status: error?.response?.status || 500,
//       data: (error?.response?.data || {message: error.message}) as T,
//     };
//   }
// };

// export default ApiRequest;
