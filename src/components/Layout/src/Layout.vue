<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRouteStore } from '@/store/modules/route';
import Header from '../components/Header.vue';

const collapsed = ref(false);

function onCollapse(val: boolean) {
  collapsed.value = val;
}

const routeStore = useRouteStore();

const menus = ref();

function genMenu() {
  routeStore.generateRoutes().then((res) => {
    menus.value = res;
  });
}

onMounted(() => {
  genMenu();
});

const router = useRouter();

// eslint-disable-next-line no-undef
function handleRoutePush(routeItem: IRouteRecordRaw) {
  router.push({ path: routeItem.path });
}
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider
      breakpoint="lg"
      :width="220"
      collapsible
      auto-open-selected
      :collapsed="collapsed"
      @collapse="onCollapse"
    >
      <div class="logo">Logo</div>
      <a-menu>
        <a-sub-menu v-for="item in menus" :key="item.name">
          <template #title>{{ item.meta.title }}</template>
          <a-menu-item
            v-for="child in item.children"
            :key="child.name"
            @click="handleRoutePush(child)"
          >
            {{ child.meta.title }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout class="px-[24px]">
        <Header />
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

  .logo {
    margin: 15px 0;
    text-align: center;
    font-size: 26px;
  }
}
</style>
