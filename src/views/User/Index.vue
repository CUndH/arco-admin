<script setup lang="ts">
import { Table, useTable } from '@/components/Table';
import { ContentWrap } from '@/components/ContentWrap';
import { onMounted } from 'vue';
import { TableColumnData } from '@arco-design/web-vue';
import { IconEdit, IconDelete } from '@arco-design/web-vue/es/icon';
import { getPage } from '../../api/User';

const [register, { getList }] = useTable({
  getListApi: getPage,
});

onMounted(() => {
  getList();
});

const tableColumns: TableColumnData[] = [
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '部门',
    slotName: 'department',
  },
  {
    slotName: 'action',
  },
];
</script>

<template>
  <ContentWrap>
    <template #content>
      <div class="table-tools">
        <div class="tools-item">
          <div class="tools-item-label">姓名：</div>
          <a-input placeholder="请输入姓名" allow-clear />
        </div>
        <div class="tools-item">
          <div class="tools-item-label">部门：</div>
          <a-select placeholder="请选择部门">
            <a-option>Beijing</a-option>
            <a-option>Shanghai</a-option>
            <a-option>Guangzhou</a-option>
            <a-option disabled>Disabled</a-option>
          </a-select>
        </div>
      </div>
      <Table :columns="tableColumns" @register="register">
        <template #department="{ record }">
          <span> {{ record.salary }} 123 </span>
        </template>
        <template #action>
          <a-button type="text">
            <template #icon> <icon-edit /> </template>
            编辑
          </a-button>
          <a-button type="text" status="danger">
            <template #icon> <icon-delete /> </template>
            删除
          </a-button>
        </template>
      </Table>
    </template>
  </ContentWrap>
</template>
