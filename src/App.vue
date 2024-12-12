<template>
  <router-view v-slot="{ Component }">
    <a-config-provider
      :locale="locale"
      :theme="{
        algorithm: studioDarkAlgorithm,
        token: {
          colorPrimary: '#0096FF',
          colorTextPlaceholder: '#999',
          colorBorder: '#0096ff',
          colorInfo: '#0096FF',
          colorInfoHover: '#fff',
          colorTextQuaternary: '#fff',
        },
      }"
      :seedToken="{
        fontSize: 20,
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
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  nextTick,
} from "vue";
import { theme } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import type { MappingAlgorithm } from "antd/es/config-provider/context";

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

// 定义 studio 暗色模式算法
const studioDarkAlgorithm: MappingAlgorithm = (
  seedToken: any,
  mapToken: any
) => {
  // 使用 antd 默认的暗色算法生成基础token，这样其他不需要定制的部分则保持原样
  const baseToken = theme.darkAlgorithm(seedToken, mapToken);

  return {
    ...baseToken,
    fontSize: 16,

    // colorBgLayout: "#20252b", // Layout 背景色
    // colorBgContainer: "#282c34", // 组件容器背景色
    // colorBgElevated: "#32363e", // 悬浮容器背景色
  };
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
