import { RES_SUCCESS_CODE } from '@/constants';

const config: {
  baseUrl: {
    base: string
    development: string
    test: string
    preproduction: string
    production: string
    sdk: string
  }
  resultCode: number | string
  defaultHeaders: AxiosHeaders
  requestTimeout: number
  accessKey: string
} = {
  /**
   * api请求基础路径
   */
  baseUrl: {
    // 开发环境接口前缀
    base: '/api',

    // 打包开发环境接口前缀
    development: '/api',

    // 打包测试环境接口前缀
    test: '/api',

    // 预生产环境接口前缀
    preproduction: '/api',

    // 打包生产环境接口前缀
    production: '/api',

    // 打包SDK接口前缀
    sdk: '/api',
  },

  /**
   * 接口成功返回状态码
   */
  resultCode: RES_SUCCESS_CODE,

  /**
   * 接口请求超时时间
   */
  requestTimeout: 60000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: 'application/json',
  accessKey: 'accessKey',
};

export { config };
