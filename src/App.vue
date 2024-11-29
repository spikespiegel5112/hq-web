<template>
  <router-view v-slot="{ Component }">
    <a-config-provider
      :theme="{
        algorithm: theme.darkAlgorithm,
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

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
const state = reactive({});

const currentMobileMode = computed(() => {
  return global.$store.state.app.currentMobileMode;
}) as any;

watch(
  () => currentMobileMode.value,
  (newValue: any, oldValue: any) => {
    initRemResizing();
  }
);

const initRemResizing = () => {
  // 5120宽度下的rem
  // let fontSize = 26.6;
  // 7680宽度下的rem
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
