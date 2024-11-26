import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";

import routeDictionary from "./routeDictionary";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    redirect: "/dashboard",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "../views/Layout.vue"),
    children: routeDictionary,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
