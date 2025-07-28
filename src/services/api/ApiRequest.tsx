import axios from 'axios';

const ApiRequest = async ({
  BaseUrl = '',

  method = 'GET',
  request = {},
}) => {
  try {
    const response = await axios({
      method,
      url: BaseUrl,
      data: method.toLowerCase() === 'get' ? null : request,
      params: method.toLowerCase() === 'get' ? request : undefined,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'API Error');
  }
};

export default ApiRequest;
