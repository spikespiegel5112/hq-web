import { getCurrentInstance, ComponentInternalInstance } from "vue";
import router from "@/router";
// import { store } from "@/store";
// import { mapGetters, useStore } from "vuex";

// const currentInstance = getCurrentInstance() as ComponentInternalInstance;
// const global = currentInstance.appContext.config.globalProperties;

router.beforeEach((to: any, from: any, next: any) => {
  console.log("+++++++++++++++++++++++++++++");
  next();
});

router.afterEach((to: any, from: any) => {
  console.log("finsh", to);
});

router.onError((error: any) => {
  console.log("router.onError", error);
});
