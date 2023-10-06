import { App } from 'vue';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const Layout = () => import('@/components/Layout/src/Layout.vue');

// todo 后期移植到 asyncRoutes 中，模拟动态路由，现在放在这里方便测试
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
  {
    path: '/user',
    name: 'User',
    component: Layout,
    meta: {
      title: '用户管理',
    },
    children: [
      {
        path: 'users',
        name: 'UserList',
        meta: {
          title: '用户列表',
        },
        component: () => import('@/views/User/Index.vue'),
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
