declare type AxiosHeaders =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'

declare type AxiosMethod = 'get' | 'post' | 'delete' | 'put' | 'patch'

declare type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

declare interface AxiosConfig {
  params?: any
  data?: any
  url?: string
  method?: AxiosMethod
  headersType?: string
  responseType?: AxiosResponseType
}

declare interface IResponse<T = any> {
  code: string | number
  msg: string
  data: T extends any ? T : T & any
}

declare type IResPromise<T = any> = Promise<IResponse<T>>

declare interface IResList<T = any> {
  // current 和 page 都代表页数，兼容不同后端返回
  current?: number
  page?: number
  size: number
  total: number
  records: T[]
}
