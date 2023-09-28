import { defineStore } from 'pinia';
import { constantRoutes } from '@/router';
import { store } from '..';

export interface RouteModuleState {
  addRoutes: IRouteRecordRaw[]
}

// todo 后续权限处理的逻辑方法也会在这
export const useRouteStore = defineStore('route', {
  state: (): RouteModuleState => ({
    addRoutes: [],
  }),
  actions: {
    generateRoutes(): Promise<IRouteRecordRaw[]> {
      return new Promise((resolve) => {
        // todo 后续增加动态路由
        const asyncRoutes: IRouteRecordRaw[] = [];
        this.addRoutes = constantRoutes.concat(asyncRoutes);

        resolve(this.addRoutes);
      });
    },
  },
});

export const routeStoreWithOut = () => useRouteStore(store);
