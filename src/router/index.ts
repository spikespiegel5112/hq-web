import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";

import baseRouteDictionary from "@/router/baseRouteDictionary";

const routes: Array<RouteRecordRaw> = baseRouteDictionary;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
