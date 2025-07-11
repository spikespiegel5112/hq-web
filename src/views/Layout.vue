<template>
  <div class="layout_container" ref="layoutRef">
    <a-layout>
      <a-layout-header>
        <Header></Header>
      </a-layout-header>
      <a-layout>
        <a-layout-sider>
          <Menu></Menu>
        </a-layout-sider>
        <a-layout-content>
          <AccessLog />
          <router-view
            v-if="dictionaryReady && eventTypeListReady"
          ></router-view>
          <div v-else class="loading">
            <LoadingOutlined />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
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
import { LoadingOutlined } from "@ant-design/icons-vue";

import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";
import AccessLog from "@/components/AccessLog.vue";

import { preplanPreplanGetPageRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({
  bannerInfo: {},
  emergencyPlanTypeReady: false,
  emergencyEventTypeReady: false,
});

const dictionaryReady = computed(() => {
  return global.$store.state.dictionary.dictionaryReady;
});

const eventTypeListReady = computed(() => {
  return state.emergencyPlanTypeReady && state.emergencyEventTypeReady;
});

const init = () => {
  setTimeout(() => {
    // 火狐需要等待一会儿才能获取dom
    const lineScaleEl: HTMLElement = document.getElementById("line-scale");
    lineScaleEl.style.display = "none";
  }, 100);
  global.$getAllDictionary();
};

const getEventTypeList = () => {
  preplanPreplanGetPageRequest({
    preplanType: global.$store.state.app.emergencyPlanType,
  })
    .then((response: any) => {
      global.$store.commit("app/updateCurrentEventTypeList", {
        type: global.$store.state.app.emergencyPlanType,
        data: response.data.list,
      });
      state.emergencyPlanTypeReady = true;
    })
    .catch((error: any) => {
      console.log(error);
    });

  preplanPreplanGetPageRequest({
    preplanType: global.$store.state.app.emergencyEventType,
  })
    .then((response: any) => {
      global.$store.commit("app/updateCurrentEventTypeList", {
        type: global.$store.state.app.emergencyEventType,
        data: response.data.list,
      });
      state.emergencyEventTypeReady = true;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(async () => {
  init();
  getEventTypeList();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background-color: #05061c;

  .ant-layout {
    height: 100%;
    .ant-layout-header {
      height: auto;
      padding: 0;
      background-image: linear-gradient(to bottom, #001529, transparent);
      background-color: transparent;
    }
  }
  .loading {
    width: 100%;
    height: calc(100% - 0.75rem);
    display: flex;
    align-items: center;
    justify-content: center;
    .anticon {
      font-size: 0.5rem;
    }
  }
}
</style>
