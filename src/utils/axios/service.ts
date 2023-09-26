import axios, {
  AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from 'axios';

import qs from 'qs';

import cookie from '@/utils/cookie';

import { config } from './config';
import { downloadByData } from '../downloadFile';

const { CancelToken } = axios;

let source = CancelToken.source();

const { baseUrl } = config;

// @ts-ignore
export const PATH_URL = baseUrl[import.meta.env.NODE_ENV] || import.meta.env.VITE_API_BASEPATH || '';

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 baseUrl
  timeout: config.requestTimeout, // 请求超时时间
  maxBodyLength: 10000,
  maxContentLength: 10000,
});

const parse = (str: string) => {
  const data = {};
  const p = str.split('&');
  p.forEach((item: string) => {
    const session = item.split('=');
    // @ts-ignore
    data[session[0]] = decodeURIComponent(session[1]);
  });
  return data;
};

const CSRF_KEY = 'access_token';

const whiteList = ['/auth/oauth/token', '/code'];

// request拦截器
service.interceptors.request.use(
  // @ts-ignore-next-line
  (axiosConfig: AxiosRequestConfig) => {
    axiosConfig.cancelToken = source.token; // 写入取消请求的标识
    if (
      axiosConfig.method === 'post'
      && (axiosConfig.headers as any)['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      axiosConfig.data = qs.stringify(axiosConfig.data);
    }
    // get参数编码
    if (axiosConfig.method === 'get' && axiosConfig.params) {
      let url = axiosConfig.url as string;
      url += '?';
      const keys = Object.keys(axiosConfig.params);
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keys) {
        // eslint-disable-next-line no-void
        if (axiosConfig.params[key] !== void 0 && axiosConfig.params[key] !== null) {
          url += `${key}=${encodeURIComponent(axiosConfig.params[key])}&`;
        }
      }
      url = url.substring(0, url.length - 1);
      axiosConfig.params = {};
      axiosConfig.url = url;
    }
    const csrf = cookie.get(CSRF_KEY);
    const sessionCsrf = sessionStorage.getItem(CSRF_KEY);
    const isWhiteList = whiteList.some((item) => axiosConfig.url === item);
    const inlineFlag = false && !isWhiteList;
    if (!isWhiteList) {
      (axiosConfig.headers as any).Authorization = `Bearer ${csrf || sessionCsrf || ''}`;
    }
    switch (axiosConfig.method) {
      case 'get':
      case 'delete':
      case 'head':
      case 'options':
        if (inlineFlag) {
          axiosConfig.params = Object.assign(axiosConfig.params || {}, {
            [CSRF_KEY]: csrf || sessionCsrf || '',
          });
        }
        break;
      case 'post':
      case 'put':
      case 'patch':
        if (typeof axiosConfig.data === 'string') {
          const str = axiosConfig.data;
          try {
            axiosConfig.data = JSON.parse(str);
          } catch (e) {
            // data数据在服务那边处理后变成了 name=val&...形式
            axiosConfig.data = parse(str);
          }
        }
        if (inlineFlag) {
          axiosConfig.data = Object.assign(axiosConfig.data || {}, {
            [CSRF_KEY]: csrf || sessionCsrf || '',
          });
        }
        break;
      default:
        break;
    }
    return axiosConfig;
  },
  (error: AxiosError) => {
    // Do something with request error
    Promise.reject(error);
  },
);

// response 拦截器
service.interceptors.response.use(
  // eslint-disable-next-line consistent-return
  (response: AxiosResponse<any>) => {
    if (response.config.responseType === 'blob') {
      // 如果是文件流
      let filename = response.headers['content-disposition'] || '';
      if (filename) {
        filename = filename.substring(filename.indexOf('filename=') + 9);
        filename = decodeURI(filename);
      }
      downloadByData(response.data, filename);
      return true;
    } if (response.status === 200) {
      return response.data;
    } if (response.status === 401) {
      source.cancel();
      source = CancelToken.source();
    } else if (response.status === 403) {
      source.cancel();
      source = CancelToken.source();
    } else {
      return response;
    }
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response?.status === 401 || response?.status === 424) {
      // @ts-ignore-next-line
      return Promise.reject(response.data?.msg || '未能读取到有效token');
    }
    return Promise.reject(error.response?.data);
  },
);

export { service };
