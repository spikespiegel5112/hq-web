<template>
  <div class="common_menu_wrapper">
    <a-menu
      v-model:openKeys="currentOpenKeys"
      v-model:selectedKeys="currentSelectKeys"
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

const currentSelectKeys = ref<string[]>(["1"]);
const currentOpenKeys = ref<string[]>(["sub1"]);

const currentRoute = computed(() => {
  return global.$route;
});
const menuList = computed(() => {
  const _routeDictionary = routeDictionary.find(
    (item: any) => item.name === "layout"
  ).children;
  let result = [] as any[];
  const looper = (chidren: any[], parentKey: number | string | null) => {
    const _result = [] as any[];
    chidren.forEach((item: any, index: number) => {
      let key;

      if (!parentKey) {
        key = index + "";
      } else {
        key = parentKey + "-" + index;
      }
      item.key = key;
      item.parentKey = parentKey;
      item.label = item.title;

      if (item.children instanceof Array && item.children.length > 0) {
        _result.push({
          ...item,
          component: undefined,
          children: looper(item.children, item.key),
        });
      } else {
        _result.push({
          ...item,
          component: undefined,
        });
      }
    });
    return _result;
  };
  result = looper(_routeDictionary, null);

  return result;
});

const initMenu = () => {
  let result: any;
  const looper = (children: any[]) => {
    children.forEach((item: any) => {
      if (!!item.children && item.children instanceof Array) {
        looper(item.children);
      } else {
        if (item.name === global.$route.name) {
          result = item;
        }
      }
    });
  };
  looper(menuList.value);

  if (result) {
    currentSelectKeys.value = [result.key];
    currentOpenKeys.value = [result.parentKey];
  }
};

const handleClickMenu = (menuData: any) => {
  const item = menuData.item;
  global.$router.push({
    name: item.name,
  });
};

onMounted(() => {
  initMenu();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_menu_wrapper {
  height: 100%;
  background-color: #020f26;
  ul {
    height: 100%;
  }
  :deep(
      .ant-menu-root .ant-menu-item > .ant-menu-title-content,
      .ant-menu-root .ant-menu-submenu-title > .ant-menu-title-content
    ) {
    text-align: left;
    color: #fff;
  }
  :deep(.ant-menu-dark) {
    background: #020f26;
  }

  :deep(.ant-menu) {
    .ant-menu-item {
      padding: 0;
      border-radius: 0;
      border-style: solid;
      border-width: 0;
      border-color: transparent;
      transition: all 0.3s;
      .ant-menu-title-content {
        text-align: left;
      }
      &.ant-menu-item-selected {
        border-color: rgb(0, 186, 255);
        border-width: 0 0 0 5px;
        background-color: transparent;
        background-image: linear-gradient(
          to right,
          rgba(0, 186, 255, 0.5) 0%,
          rgba(0, 186, 255, 0) 70%
        );
      }
    }
    .ant-menu-submenu {
      .ant-menu-submenu-title {
        .ant-menu-title-content {
          text-align: left;
          color: #fff;
        }
      }
      &.ant-menu-submenu-selected {
        .ant-menu-submenu-title {
          color: #00baff;
          .ant-menu-title-content {
            color: #00baff;
          }
        }
      }
    }
  }
}
</style>
