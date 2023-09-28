<script setup lang="ts">
import { Table, useTable } from '@/components/Table';
import { ContentWrap } from '@/components/ContentWrap';
import { getMenuList } from '@/api/Index';
import { onMounted } from 'vue';

const [register, { getListByParams }] = useTable({
  getListApi: getMenuList,
});

onMounted(() => {
  getListByParams({ a: 'asd' });
});
</script>

<template>
  <ContentWrap>
    <template #content>
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
    </template>
  </ContentWrap>
</template>

<style lang="scss" scoped></style>
