import { ref } from 'vue';
import { BasicTableProps, UseTableReturnType } from '../types';
import { Table } from '../..';

export function useTable(props?: BasicTableProps): UseTableReturnType {
  const tableRef = ref();

  function register(instance: typeof Table) {
    tableRef.value = instance;
    instance.setProps(props);
  }

  const methods = {
    getList: () => tableRef.value.getList(),
    getListByParams: (params: any) => tableRef.value.getListByParams(params),
  };

  return [register, methods];
}
