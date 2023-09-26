import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const Layout = () => import('@/components/Layout/src/Layout.vue');

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: Layout,
    children: [
      {
        path: 'abc',
        name: 'TestPage',
        component: () => import('@/views/test.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = (app: App) => {
  app.use(router);
};

export default router;
