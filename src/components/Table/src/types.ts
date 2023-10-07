import { PaginationProps } from '@arco-design/web-vue';
import { Table } from '..';

export interface BasicTableProps {
  loading?: boolean;
  getListApi: (params?: any) => Promise<IResponse<IResList<any>>>;
  getListCallBack?: (res: any) => any;
  pagination?: Partial<PaginationProps>;
}

export type RegisterFn = (instance: typeof Table) => void;

export interface UseTableReturnMethods {
  getList: () => Promise<IResponse<IResList<any>>>,
  getListByParams: (params?: any) => Promise<IResponse<IResList<any>>>,
}

export type UseTableReturnType = [RegisterFn, UseTableReturnMethods]
