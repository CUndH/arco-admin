import { service } from './service';

import { config } from './config';

const { defaultHeaders } = config;

interface HeadersType {
  headers?: {
    isToken: boolean
    Authorization: string
  }
}

export const request = <T>(option: AxiosConfig & HeadersType): IResPromise<T> => {
  const {
    url, method, params, data, headersType, responseType, headers,
  } = option;
  return service({
    url,
    method,
    params,
    data,
    responseType,
    headers: {
      'Content-Type': headersType || defaultHeaders,
      ...headers,
    },
  }) as unknown as IResPromise<T>;
};
export default {
  get: <T>(option: AxiosConfig & HeadersType) => request<T>({ method: 'get', ...option }),
  post: <T>(option: AxiosConfig & HeadersType) => request<T>({ method: 'post', ...option }),
  patch: <T>(option: AxiosConfig & HeadersType) => request<T>({ method: 'patch', ...option }),
  delete: <T>(option: AxiosConfig & HeadersType) => request<T>({ method: 'delete', ...option }),
  put: <T>(option: AxiosConfig & HeadersType) => request<T>({ method: 'put', ...option }),
};
