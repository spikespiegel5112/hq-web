<template>
  <div class="common_accesslog_wrapper">
    <a-space>
      <div
        class="route"
        :class="item.active ? 'active' : ''"
        v-for="item in state.accessLogList"
      >
        <a class="title" href="javascript:;">{{ item.meta.title }}</a>
        <a class="close" href="javascript:;">
          <div class="idle">
            <CloseOutlined />
          </div>
          <div class="hover">
            <CloseCircleFilled />
          </div>
        </a>
      </div>
    </a-space>
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
import { CloseOutlined, CloseCircleFilled } from "@ant-design/icons-vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({
  accessLogList: [] as any[],
});

const isActive = (routeData: any) => {
  const result = state.accessLogList.find((item: any) => {
    return routeData.name === item.name;
  });
  return !!result;
};

watch(
  () => global.$route,
  (newValue: any, oldValue: any) => {
    recordRoute(newValue);
  }
);

const recordRoute = (newValue: any) => {
  const matchedRouteList = newValue.matched;
  const newRoute = matchedRouteList.filter((item1: any) => {
    return (
      !state.accessLogList.find((item2: any) => item2.name === item1.name) &&
      item1.name !== "layout"
    );
  });
  if (newRoute.length > 0) {
    const lastOne = newRoute[newRoute.length - 1];
    if (lastOne.meta.title) {
      state.accessLogList.push(lastOne);
    }
  }
  state.accessLogList.forEach((item: any) => {
    item.active = newValue.name === item.name;
  });
  console.log("newRoute");
  console.log(newRoute);
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.common_accesslog_wrapper {
  display: flex;
  padding: 0 0.2rem;
  width: 100%;
  height: 0.6rem;
  align-items: center;
  .ant-form {
    width: 100%;
    .ant-form-item {
      margin: 0;
    }
    .operation {
      text-align: right;
    }
  }
  .route {
    padding: 0.1rem;
    color: #fff;
    border: 1px solid #333;
    transition: 0.3s all;
    &.active {
      background-color: #0062ff;
    }
    &:hover {
      border: 1px solid #666;
    }
    .title {
      color: #fff;
    }
    .close {
      display: inline-block;
      margin: 0 0 0 0.1rem;
      padding: 0.03rem;
      color: #fff;
      border-radius: 50%;
      &:hover {
        background-color: #fff;
        color: #333;
        &.idle {
          display: none;
        }
        &.hover {
          display: inline-block;
        }
      }
    }
    .idle {
      display: inline-block;
    }
    .hover {
      display: none;
    }
  }
}
</style>
