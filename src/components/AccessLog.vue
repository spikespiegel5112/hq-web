<template>
  <div class="common_accesslog_wrapper">
    <vue-scroll>
      <a-space>
        <div
          class="route"
          :class="item.active ? 'active' : ''"
          v-for="item in state.accessLogList"
          @auxclick="handleMouseClick(item)"
        >
          <a class="title" href="javascript:;" @click="handleNavigate(item)">
            {{ item.meta.title }}
          </a>
          <a class="close" href="javascript:;" @click="handleClose(item)">
            <div class="idle">
              <CloseOutlined />
            </div>
            <div class="hover">
              <CloseCircleFilled />
            </div>
          </a>
        </div>
      </a-space>
    </vue-scroll>
  </div>
</template>

<script lang="tsx" setup>
import {
  reactive,
  watch,
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

const formDataRef = ref();

const state = reactive({
  accessLogList: [] as any[],
});

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

const handleNavigate = (routeData: any) => {
  global.$router.push({
    name: routeData.name,
  });
};

const handleMouseClick = (routeData: any) => {
  handleClose(routeData);
};

const handleClose = (routeData: any) => {
  let indexToDelete: number = 0;
  state.accessLogList.forEach((item: any, index: number) => {
    if (item.name === routeData.name) {
      indexToDelete = index;
    }
  });
  state.accessLogList.splice(indexToDelete, 1);
};

const init = () => {
  recordRoute(global.$route);
};

onMounted(async () => {
  init();
  // for (let index = 0; index < 100; index++) {
  //   state.accessLogList.push({
  //     title: "客流月报表",
  //     path: "MonthlyPassengerFlowSheet",
  //     name: "MonthlyPassengerFlowSheet",
  //     meta: {
  //       title: "客流月报表",
  //     },
  //   });
  // }
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.common_accesslog_wrapper {
  display: flex;
  margin: 0.15rem 0 0 0;
  padding: 0 0.2rem;
  width: 100%;
  height: 0.5rem;
  align-items: center;
  .ant-space {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    .route {
      padding: 0 0.1rem 0 0;
      border: 1px solid #333;
      transition: 0.3s all;

      &.active {
        background-color: #0062ff;
        .title {
          color: #fff;
        }
      }
      &:hover {
        border: 1px solid #666;
        .title {
          color: #fff;
        }
      }
      .title {
        display: inline-block;
        padding: 0.1rem;
        color: #ccc;
      }
      .close {
        display: inline-block;
        padding: 0.03rem;
        color: #fff;
        border-radius: 50%;
        font-size: 0.15rem;
        &:hover {
          background-color: #ccc;
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
}
</style>
