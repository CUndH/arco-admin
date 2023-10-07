import {
  ComputedRef, computed, ref, unref,
} from 'vue';
import { PaginationProps } from '@arco-design/web-vue';
import { BasicTableProps } from '../types';

interface ActionType {
  getPaginationRef: ComputedRef<PaginationProps>,
  setLoading: (loading: boolean) => void
}

export function useData(props: ComputedRef<BasicTableProps>, otherProps: ActionType) {
  const data = ref<any>([]);

  const cb = unref(props).getListCallBack;

  function fetchListCallback(res: IResponse<IResList<any>>) {
    data.value = res.data ? res.data.records : [];
    otherProps.getPaginationRef.value.total = res.data.total;
    if (cb) {
      cb(res.data);
    }
    otherProps.setLoading(false);
  }

  function getParams(withParams?: boolean, paramsObj?: any) {
    const pagination = { ...unref(otherProps.getPaginationRef) };
    let params = {
      current: pagination.current,
      size: pagination.pageSize,
    };
    if (withParams) {
      params = {
        ...params,
        ...paramsObj,
      };
    }

    return params;
  }

  async function fetchList() {
    const fetch = unref(props).getListApi(getParams());

    otherProps.setLoading(true);
    return fetch.then(fetchListCallback);
  }

  async function fetchListByParams(params: any) {
    const fetch = unref(props).getListApi(getParams(true, params));

    otherProps.setLoading(true);
    return fetch.then(fetchListCallback);
  }

  function getListData() {
    return unref(data);
  }

  const getListDataRef = computed(() => data.value);

  return {
    fetchList,
    fetchListByParams,
    getListData,
    getListDataRef,
  };
}
