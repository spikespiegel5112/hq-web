import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";

import routeDictionary from "./routeDictionary";
const routes: Array<RouteRecordRaw> = routeDictionary;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
