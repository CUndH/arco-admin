<script setup lang="ts">
import { Table, useTable } from '@/components/Table';
import { ContentWrap } from '@/components/ContentWrap';
import { getMenuList } from '@/api/Index';
import { onMounted } from 'vue';
import { useModal } from '@/components/BasicModal';
import TestModal from './TestModal.vue';

const [register, { getListByParams }] = useTable({
  getListApi: getMenuList,
});

onMounted(() => {
  getListByParams({ a: 'asd' });
});

const [registerModal, { openModal }] = useModal();

function handleAdd() {
  openModal(true, {
    a: 1,
  });
}
</script>

<template>
  <ContentWrap>
    <template #content>
      <div>
        <a-button type="primary" @click="handleAdd">创建</a-button>
      </div>
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

  <TestModal @register="registerModal"></TestModal>
</template>

<style lang="scss" scoped></style>
