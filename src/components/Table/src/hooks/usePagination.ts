import {
  ComputedRef,
  computed,
  ref, unref, watch,
} from 'vue';
import { PaginationProps } from '@arco-design/web-vue';
import { BasicTableProps } from '../types';

export function usePagination(props: ComputedRef<BasicTableProps>) {
  const paginationRef = ref<PaginationProps>();

  // 默认值处理
  watch(() => unref(props).pagination, (pagination) => {
    if (typeof pagination === 'object') {
      paginationRef.value = {
        ...unref(paginationRef),
        ...pagination,
      };
    }
  });

  const getPaginationRef = computed((): PaginationProps => ({
    current: 1,
    pageSize: 10,
    size: 'small',
    showTotal: true,
    ...unref(paginationRef),
  }));

  function getPagination(): PaginationProps {
    return unref(getPaginationRef);
  }

  function setPagination(info: Partial<PaginationProps>) {
    const pagination = getPagination();

    paginationRef.value = {
      ...pagination,
      ...info,
    };
  }

  return { getPaginationRef, getPagination, setPagination };
}
