<template>
  <router-view v-slot="{ Component }">
    <a-config-provider
      :locale="locale"
      :theme="{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#0096FF',
          colorTextPlaceholder: '#999',
          colorBorder: '#0096ff',
          colorInfo: '#0096FF',
          colorInfoHover: '#fff',
          colorTextQuaternary: '#fff',
        },
      }"
    >
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </a-config-provider>
  </router-view>
</template>

<script lang="tsx" setup>
import {
  ref,
  unref,
  reactive,
  watch,
  computed,
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  nextTick,
} from "vue";
import { theme } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
const state = reactive({});

const locale = ref(zhCN);

const initRemResizing = () => {
  let fontSize = 40;

  global.$remResizing({
    baseline: 320,
    fontSize: fontSize,
    threshold: 640,
  });
  console.log("=====initRemResizing=====");
  console.log(fontSize);
};

onMounted(() => {
  initRemResizing();
});
</script>

<style scoped lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
