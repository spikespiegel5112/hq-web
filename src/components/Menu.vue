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

  console.log(result);

  return result;

  // return routeDictionary.map((item: any, index: number) => {
  //   return {
  //     ...item,
  //     key: index,
  //     component: undefined,
  //   };
  // });
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
    .filter((item: any) => item.name === global.$route.name)
    .map((item: any) => item.key);

  return result;
}) as any;

const initMenu = () => {
  const currentSelectKeys = menuList.value
    .filter((item: any) => item.name === global.$route.name)
    .map((item: any) => item.key);

  state.currentSelectKeys = currentSelectKeys;
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
      .ant-menu-title-content {
        text-align: left;
      }
      &.ant-menu-item-selected {
        padding-left: 0 !important;
        background-color: transparent;
        background-image: linear-gradient(
          to right,
          rgba(0, 186, 255, 0.5) 0%,
          rgba(0, 186, 255, 0) 70%
        );
        &:before {
          content: "";
          display: inline-block;
          margin: 0 20px 0 0;
          width: 5px;
          height: 100%;
          background-color: rgb(0, 186, 255);
        }
      }
    }
    .ant-menu-submenu {
      .ant-menu-submenu-title {
        .ant-menu-title-content {
          text-align: left;
          color: #fff;
        }
      }
    }
  }
}
</style>
