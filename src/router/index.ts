import { App } from 'vue';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const Layout = () => import('@/components/Layout/src/Layout.vue');

export const constantRoutes: IRouteRecordRaw[] = [
  {
    path: '/test',
    name: 'Test',
    component: Layout,
    meta: {
      title: '测试',
    },
    children: [
      {
        path: 'abc',
        name: 'TestPage',
        meta: {
          title: '测试111',
        },
        component: () => import('@/views/test.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = (app: App) => {
  app.use(router);
};

export default router;
