<template>
  <div class="common_menu_wrapper">
    <a-menu
      v-model:selectedKeys="state.currentSelectKeys"
      mode="inline"
      :theme="theme"
      :items="menuList"
      @click="handleClickMenu"
    />
  </div>
</template>

<script lang="tsx" setup>
import {
  reactive,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ComponentInternalInstance,
  ref,
  nextTick,
} from "vue";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
import type { MenuTheme } from "ant-design-vue";

import routeDictionary from "@/router/routeDictionary";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({});
const theme = ref<MenuTheme>("dark");
const selectedKeys = ref(["1"]);
const menuList = computed(() => {
  return routeDictionary.map((item, index: number) => {
    return {
      ...item,
      key: index,
      component: undefined,
    };
  });
});

const items = ref([]);

const state = reactive({
  currentSelectKeys: [] as any[],
});

const currentRoute = computed(() => {
  return global.$route;
}) as any;

const currentOpenKeys = computed(() => {
  const result = menuList.value
    .filter((item) => item.name === global.$route.name)
    .map((item) => item.key);

  return result;
}) as any;

const initMenu = () => {
  const currentSelectKeys = menuList.value
    .filter((item) => item.name === global.$route.name)
    .map((item) => item.key);

  state.currentSelectKeys = currentSelectKeys;
};

const handleClickMenu = (menuData) => {
  const item = menuData.item;
  global.$router.push({
    name: item.name,
  });
  // debugger;
};

onMounted(() => {
  initMenu();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_menu_wrapper {
}
</style>
