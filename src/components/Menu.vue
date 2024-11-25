<template>
  <div class="common_menu_wrapper">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :theme="theme"
      :items="items"
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

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({});
const theme = ref<MenuTheme>("dark");
const selectedKeys = ref(["1"]);
const openKeys = ref(["sub1"]);
const menuList = [
  {
    label: "首页",
    title: "首页",
    icon: () => h(PieChartOutlined),
  },
  {
    label: "区域小时客流",
    title: "区域小时客流",
    icon: () => h(PieChartOutlined),
  },
  {
    label: "区域实时客流",
    title: "区域实时客流",
    icon: () => h(PieChartOutlined),
  },
  {
    label: "事件管理",
    title: "事件管理",
    icon: () => h(PieChartOutlined),
  },
  {
    label: "信息管理",
    title: "信息管理",
    icon: () => h(PieChartOutlined),
  },
  {
    label: "运行管理",
    title: "运行管理",
    icon: () => h(PieChartOutlined),
  },
  {
    label: "报表管理",
    title: "报表管理",
    icon: () => h(PieChartOutlined),
  },
  {
    label: "系统管理",
    title: "系统管理",
    icon: () => h(PieChartOutlined),
  },
];
const items = ref([]);

const initMenu = () => {
  menuList.forEach((item: any, index: number) => {
    item.key = index;
  });
  items.value = menuList;
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
