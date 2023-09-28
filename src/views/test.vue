<script setup lang="ts">
import { Table, useTable } from '@/components/Table';
import { getMenuList } from '@/api/Index';
import { onMounted } from 'vue';

const [register, { getList, getListByParams }] = useTable({
  getListApi: getMenuList,
});

onMounted(() => {
  getListByParams({ a: 'asd' });
});
</script>

<template>
  <Table
    :columns="[
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ]"
    @register="register"
  />
  <div />
</template>

<style lang="scss" scoped></style>
