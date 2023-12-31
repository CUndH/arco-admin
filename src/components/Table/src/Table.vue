<script lang="ts">
import { PropType, computed, defineComponent, onMounted, ref, unref } from 'vue';
import { TableColumnData } from '@arco-design/web-vue';
import { usePagination } from './hooks/usePagination';
import { BasicTableProps } from './types';
import { useData } from './hooks/useData';

export default defineComponent({
  name: 'YlTable',
  props: {
    columns: {
      type: Array as PropType<TableColumnData[]>,
      required: true,
    },
  },
  emits: ['register'],
  setup(props, { attrs, emit }) {
    const innerPropsRef = ref<BasicTableProps>({
      loading: false
    });

    const getProps = computed(() => ({ ...props, ...unref(innerPropsRef) }) as BasicTableProps);

    function setProps(basicProps: BasicTableProps) {
      innerPropsRef.value = { ...unref(innerPropsRef), ...basicProps };
    }

    function setLoading(loading: boolean) {
      innerPropsRef.value.loading = loading;
    }

    const { getPaginationRef, setPagination } = usePagination(getProps);

    const { fetchList, fetchListByParams, getListDataRef } = useData(getProps, {
      getPaginationRef,
      setLoading
    });

    function handlePageChange(current: number) {
      setPagination({ current });
      fetchList();
    }

    function handlePageSizeChange(pageSize: number) {
      setPagination({ pageSize });
      fetchList();
    }

    const getBindValue = computed(() => {
      const bindValue: Recordable = {
        ...attrs,
        ...props,
        pagination: unref(getPaginationRef),
        data: unref(getListDataRef),
        loading: unref(innerPropsRef).loading
      };

      return bindValue;
    });

    const tableRef = ref();

    onMounted(() => {
      emit('register', {
        setProps,
        getList: fetchList,
        getListByParams: fetchListByParams,
      });
    });

    return {
      tableRef,
      setProps,
      getBindValue,
      handlePageChange,
      handlePageSizeChange,
      getList: fetchList,
    };
  },
});
</script>

<template>
  <a-table
    ref="tableRef"
    v-bind="getBindValue"
    @page-change="handlePageChange"
    @page-size-change="handlePageSizeChange"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
      <slot :name="item" v-bind="data"></slot>
    </template>
  </a-table>
</template>
