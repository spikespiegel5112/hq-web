<template>
  <div
    class="layout_container"
    ref="layoutRef"
  >
    <!-- <div class="debuggingtools">
      <div class="currenttime"></div>
      <a-space>
        <a-button>上一天</a-button>
        <a-button>下一天</a-button>
      </a-space>
    </div> -->

    <div
      class="content"
      ref="contentRef"
    >
      <Header
        :bannerInfo="state.bannerInfo"
        :stuffDutyList="state.stuffDutyList"
      ></Header>
      <div class="main">
        <Left :bannerInfo="state.bannerInfo"></Left>
        <Middle class="middle"></Middle>
        <Right class="right"></Right>
        <div class="map">
          <!-- <iframe class="content" src="https://www.baidu.com" frameborder="0"></iframe> -->
          <iframe
            v-if="global.$store.state.app.envMode.MODE === 'test'"
            class="content"
            src="http://10.141.10.13/#/?shareLogin&GNKh3QOOIeEbZ0goH7xWu1D67svaWIorQYwwk4JuYztmRG+8m7sEEyMsJA4bFzkExcYMlFSFsrcuMNZKkzQfR+IjYT+kX+va4/E/tuepspA="
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
    <a-modal
      :style="{
        width: '12rem',
      }"
      v-model:open="global.$store.state.app.pdfViewerVisible"
      :footer="null"
      @change="
        (visible:boolean) => {
          global.$store.commit('app/updatePdfViewerVisible', visible);
        }
      "
      @onError="handleOnPdfViewerError"
    >
      <PDFViewer
        v-if="global.$store.state.app.pdfViewerVisible"
        :filePath="global.$store.state.app.pdfViewerFilePath"
      />
    </a-modal>

    <a-modal
      :style="{
        width: '12rem',
      }"
      v-model:open="global.$store.state.app.videoPlayerVisible"
      :footer="null"
      @change="
        (visible:boolean) => {
          global.$store.commit('app/updateVideoPlayerVisible', visible);
        }
      "
      @onError="handleOnVideoPlayerError"
    >
      <VideoPlayer
        v-if="global.$store.state.app.videoPlayerVisible"
        :filePath="global.$store.state.app.videoPlayerFilePath"
      />
    </a-modal>
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
} from 'vue';

import Header from '@/components/Header.vue';
import Left from './left/Left.vue';
import Middle from './middle/Middle.vue';
import Right from './right/Right.vue';
import { screenBannerInfoRequest } from '@/api/screen';
import PDFViewer from '@/components/PDFViewer.vue';
import VideoPlayer from '@/components/VideoPlayer.vue';

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);
const contentRef = ref(HTMLDivElement);
const chatListRef = ref(HTMLDivElement);

console.log(chatListRef);

const state = reactive({
  stuffDutyList: [] as any[],
  bannerInfo: {},
});

watch(
  () => global.$store.state.app.pdfViewerVisible,
  (newValue: any, oldValue: any) => {}
);

watch(
  () => global.$store.state.app.videoPlayerVisible,
  (newValue: any, oldValue: any) => {}
);

const getBannerInfo = () => {
  screenBannerInfoRequest({
    ...global.$store.state.app.currentQueryDateParams,
  })
    .then((response: any) => {
      console.log('=====screenBannerInfoRequest=====');
      console.log(response);

      response = response.data;
      state.bannerInfo = response;
      state.stuffDutyList = response.staffDutyList;
      global.$store.commit('app/updateBannerInfo', state.bannerInfo);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const initTimer = () => {
  setTimeout(() => {
    global.$store.dispatch('app/refreshCurrentQueryDate');
  }, 1000);
};

const handleOnPdfViewerError = (visible: boolean) => {
  setTimeout(() => {
    global.$store.commit('app/updatePdfViewerVisible', false);
  }, 1000);
};

const handleOnVideoPlayerError = (visible: boolean) => {
  setTimeout(() => {
    global.$store.commit('app/updateVideoPlayerVisible', false);
  }, 1000);
};

onMounted(async () => {
  console.log(global.$store.state.app.envMode);
  initTimer();
  getBannerInfo();

  // 临时滚动到右边
  // 123
  setTimeout(function () {
    var x = document.body.scrollWidth; // 获取页面最大宽度
    var y = document.body.scrollHeight; // 获取页面最大宽度
    window.scrollTo(700, 500); // 设置滚动条最左方位置
  }, 100);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.layout_container {
  display: flex;

  width: 7680px;
  height: 2160px;
  // width: 5120px;
  // height: 1440px;
  min-height: 100vh;
  // min-height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: inherit;
  color: #303030;
  overscroll-behavior: none;
  background-color: #040c1f;

  &:before {
    content: '';
    display: inline-block;
    width: 0;
    height: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    box-shadow: 50px 50px 100px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
    pointer-events: visible;

    .main {
      display: flex;
      padding: 1.45rem 0 0 0;
      width: 100%;
      justify-content: space-between;
      position: relative;

      .middle {
        margin: 1rem 0 0 0;
        height: 4.5rem;
        z-index: 2;
      }

      .right {
        z-index: 1;
        // margin: 0 0.6rem 0 0;
      }
    }
  }

  .map {
    width: 100%;
    min-height: 100vh;
    position: absolute;
    left: 0;
    top: 0;

    .content {
      margin: 0 auto;
      // width: 55rem;
      width: 48rem;
      height: 27rem;
      position: relative;
      // left: 4rem;
    }

    // z-index: -1;
  }
}
.debuggingtools {
  position: fixed;
  right: 1rem;
  top: 0.5rem;
  z-index: 2;
}
</style>
