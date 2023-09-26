<script setup lang="ts">
import { ref } from 'vue';

const collapsed = ref(false);

function onCollapse(val: boolean) {
  collapsed.value = val;
}
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider
      breakpoint="lg"
      :width="220"
      collapsible
      :collapsed="collapsed"
      @collapse="onCollapse"
    >
      <div class="logo" />
      <a-menu>
        <a-menu-item>123</a-menu-item>
        <a-sub-menu>
          <a-menu-item>456</a-menu-item>
          <a-menu-item>789</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header> Header </a-layout-header>
      <a-layout class="px-[24px]">
        <a-breadcrumb class="my-[16px]">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100vh;
  box-sizing: border-box;
  background-color: var(--color-bg-1);
}
</style>
