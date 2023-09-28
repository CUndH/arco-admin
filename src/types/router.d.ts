import { RouteRecordRaw } from 'vue-router';

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

declare global {
  declare interface RouteMeta {
    title: string;
  }

  declare interface IRouteRecordRaw extends RouteRecordRaw {
    name: string;
    path: string;
    meta?: RouteMeta;
    component: Component;
    children?: IRouteRecordRaw[];
    props?: any;
  }
}
