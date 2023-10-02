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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['register'],
  setup(props, { attrs, emit }) {
    const innerPropsRef = ref<BasicTableProps>();

    const getProps = computed(() => ({ ...props, ...unref(innerPropsRef) }) as BasicTableProps);

    function setProps(basicProps: BasicTableProps) {
      innerPropsRef.value = { ...unref(innerPropsRef), ...basicProps };
    }

    const { getPaginationRef, setPagination } = usePagination(getProps);

    const { fetchList, fetchListByParams, getListDataRef } = useData(getProps, {
      getPaginationRef,
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
  />
</template>
