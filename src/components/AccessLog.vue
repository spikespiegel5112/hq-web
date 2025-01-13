<template>
  <div class="common_accesslog_wrapper" ref="accesslogRef">
    <vue-scroll>
      <a-space>
        <template
          v-for="item in state.routeList.filter((item:any)=>item.isUsed)"
          @auxclick="handleMouseClick(item)"
        >
          <div
            class="route"
            :class="item.active ? 'active' : ''"
            ref="routeRef"
          >
            <a class="title" href="javascript:;" @click="handleChooseTag(item)">
              {{ item.title }}
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
        </template>
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

import routeDictionary from "@/router/routeDictionary";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const accesslogRef = ref();
const routeRef = ref();

const state = reactive({
  accessLogList: [] as any[],
  routeList: [] as any[],
  currentLogWidth: 0,
  autoCoordinate: true,
});

watch(
  () => global.$route,
  (newValue: any, oldValue: any) => {
    state.autoCoordinate = true;
    recordRoute(newValue);
    handleNavigate(newValue);
  }
);

const initRouteList = () => {
  let result = [] as any[];
  const looper = (children: any[]) => {
    children.forEach((item: any, index: number) => {
      result.push({
        ...item,
        isUsed: false,
        active: false,
      });
      if (item.children instanceof Array && item.children.length > 0) {
        looper(item.children);
      }
    });
  };
  looper(routeDictionary.find((item: any) => item.name === "layout").children);
  result = result.filter((item: any) => {
    return !item.children;
  });
  state.routeList = result;
};

const recordRoute = (newValue: any) => {
  state.routeList.forEach((item: any) => {
    if (item.name === newValue.name) {
      item.isUsed = true;
    }
  });
};

const handleChooseTag = (routeData: any) => {
  state.autoCoordinate = false;
  handleNavigate(routeData);
};

const handleNavigate = (routeData: any) => {
  state.routeList.forEach((item: any) => {
    item.active = routeData.name === item.name;
  });
  global.$router.push({
    name: routeData.name,
  });
  measurementWidth();
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

const measurementWidth = async () => {
  if (!state.autoCoordinate) {
    return;
  }
  console.log(accesslogRef);
  console.log(routeRef.value);
  await nextTick();

  const accesslogWraperWidth = accesslogRef.value.clientWidth;
  const accesslogContentEl = document.querySelectorAll(".__panel")[1];

  if (!!routeRef.value) {
    const activeLog = routeRef.value.find((item: any) => {
      console.log(JSON.stringify(item.classList));
      return Object.values(item.classList).some(
        (item2: string) => item2 === "active"
      );
    });
    const activeLogOffsetLeft: number = activeLog.offsetLeft;

    state.currentLogWidth = routeRef.value.reduce((sum: number, cur: any) => {
      return cur.clientWidth + sum;
    }, 0);
  }
  // console.log("accesslogWraperWidth");
  // console.log(accesslogWraperWidth);
  // console.log("state.currentLogWidth");
  // console.log(state.currentLogWidth);

  if (state.currentLogWidth > accesslogWraperWidth) {
    let reduceFlag = true;
    let scrollLeft = 0;
    routeRef.value.forEach((item: any, index: number) => {
      if (
        Object.values(item.classList).some(
          (item2: string) => item2 === "active"
        )
      ) {
        reduceFlag = false;
      }
      if (reduceFlag) {
        scrollLeft += index - 1 <= 0 ? 0 : item.clientWidth + 26;
      }
    });
    console.log("scrollLeft");
    console.log(scrollLeft);
    if (scrollLeft < accesslogWraperWidth) {
      scrollLeft = 0;
    }

    accesslogContentEl.scrollLeft =
      Math.floor(scrollLeft / accesslogWraperWidth) * accesslogWraperWidth;
  }
  accesslogRef.value.addEventListener("wheel", function (event: any) {
    event.preventDefault();

    var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
    accesslogContentEl.scrollLeft -= delta * 20; // 调整滚动位置的速度
  });
};

const init = () => {
  recordRoute(global.$route);
  handleNavigate(global.$route);
  measurementWidth();
};

onMounted(async () => {
  initRouteList();
  init();
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
