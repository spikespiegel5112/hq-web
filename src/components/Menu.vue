<template>
  <div class="common_menu_wrapper">
    <vue-scroll>
      <a-menu
        v-model:openKeys="currentOpenKeys"
        v-model:selectedKeys="currentSelectKeys"
        mode="inline"
        :theme="theme"
      >
        <template v-for="(item, index) in menuList" :key="index">
          <a-menu-item
            v-if="!item.children || item.children.length === 0"
            :key="item.key"
            @click="handleClickMenu(item)"
          >
            <template v-slot:icon>
              <img :src="item.icon" alt="" />
            </template>
            <div>
              <span> {{ item.title }}</span>
            </div>
          </a-menu-item>
          <template v-else>
            <a-sub-menu :key="item.key">
              <template v-slot:icon>
                <img :src="item.icon" alt="" />
              </template>
              <template v-slot:title>
                {{ item.title }}
              </template>
              <template v-for="item2 in item.children">
                <a-menu-item
                  v-if="!item2.children"
                  :key="item2.key"
                  @click="handleClickMenu(item2)"
                >
                  <span>{{ item2.title }}</span>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </template>
      </a-menu>
    </vue-scroll>
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
  h,
} from "vue";

import type { MenuTheme } from "ant-design-vue";
import systemRouteDictionary from "@/router/systemRouteDictionary";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const theme = ref<MenuTheme>("dark");

const currentSelectKeys = ref<string[]>(["1"]);
const currentOpenKeys = ref<string[]>(["sub1"]);

const parsedRouteDictionary = computed(() => {
  const result = global.$store.state.app.parsedRouteDictionary;
  return result;
}) as any;

const menuList = computed(() => {
  // const _routeDictionary = routeDictionary.find(
  //   (item: any) => item.name === "layout"
  // ).children;

  const _routeDictionary = parsedRouteDictionary.value;
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
      item.icon = new URL(item.icon, import.meta.url).href;

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

watch(
  () => global.$route,
  (newValue: any, oldValue: any) => {
    initMenu();
  }
);

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
  const item = menuData;
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
    overflow: auto;
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
    .ant-menu-item-icon {
      display: inline-block;
      margin: 0 0.1rem 0 0;
      width: 0.15rem;
    }
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
