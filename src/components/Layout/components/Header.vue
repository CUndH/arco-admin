<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const matches = ref();

const route = useRoute();

function genBreadCrumb() {
  matches.value = route.matched;
}

onMounted(() => {
  genBreadCrumb();
});

function handleLogout() {
  console.log('logout');
}
</script>

<template>
  <a-layout-header class="header">
    <a-breadcrumb class="my-[16px]">
      <a-breadcrumb-item v-for="item in matches" :key="item.name">
        {{ item.meta.title }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-dropdown trigger="hover">
      <span>Dark 磊<icon-down class="ml-[8px]" /></span>
      <template #content>
        <a-doption @click="handleLogout">退出登录</a-doption>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
}
</style>
