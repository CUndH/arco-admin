import request from '@/utils/axios';

export const getMenuList = (props: any): Promise<IResponse<IResList<any>>> => request.get({
  url: 'https://mock.apifox.cn/m1/3363570-0-default/api/menu',
  params: props,
});
