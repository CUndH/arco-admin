<script setup lang="ts">
import { Table, useTable } from '@/components/Table';
import { ContentWrap } from '@/components/ContentWrap';
import { onMounted } from 'vue';
import { TableColumnData } from '@arco-design/web-vue';
import { getPage } from '../../api/User';

const [register, { getList }] = useTable({
  getListApi: getPage,
});

onMounted(() => {
  getList();
});

const tableColumns: TableColumnData[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Department',
    slotName: 'department',
  },
];
</script>

<template>
  <ContentWrap>
    <template #content>
      <Table :columns="tableColumns" @register="register">
        <template #department="{ record }">
          <span> {{ record.salary }} 123 </span>
        </template>
      </Table>
    </template>
  </ContentWrap>
</template>
