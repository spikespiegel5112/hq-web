<template>
  <div class="common_jeader_wrapper">
    <div class="background"></div>
    <div class="title">
      <span class="arrow"></span>
      <span class="text">虹桥枢纽运行管理一体化平台</span>
    </div>
    <div class="right">
      <div>
        <div class="date">
          <span>
            {{ global.$dayjs().format("YYYY-MM-DD") }}
          </span>
          <span>
            {{ global.$dayjs().format("hh:mm:ss") }}
          </span>
          <span>
            {{ global.$dayjs().format("dddd") }}
          </span>
        </div>
        <div class="user">
          <span class="avatar"> </span>
          <span class="name">Admin</span>
          <span class="logout">
            <PoweroffOutlined />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import {
  MenuFoldOutlined,
  PoweroffOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";

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

const props = defineProps({
  bannerInfo: {
    type: Object,
    default: {},
    required: false,
  },

  title: {
    type: String,
    default: "",
    required: false,
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  currentTime: "",
  clientWidth: 0,
  bannerInfo: {} as any,
});

const blockSize = computed(() => {
  return props.width + "-" + props.height;
}) as any;

watch(
  () => props.bannerInfo,
  (newValue: any, oldValue: any) => {
    initClock();
  }
);

const initClock = () => {
  setInterval(() => {
    state.currentTime = global.$dayjs().format("YYYY-MM-DD HH:mm:ss");
  }, 1000);
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_jeader_wrapper {
  display: flex;
  padding: 0 0.2rem;
  height: 0.9rem;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1rem;
    background-color: transparent;
    background-image: url("@/assets/header_bg.png");
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
  .title {
    display: flex;
    align-items: center;
    width: 6rem;
    font-size: 0.35rem;
    text-align: left;
    font-weight: bold;
    text-shadow: 0.01rem 0.01rem 0.1rem #0040d1;
    z-index: 1;
    .arrow {
      display: inline-block;
      margin: 0 0.2rem 0 0;
      width: 0.5rem;
      height: 0.5rem;
      background-image: url("@/assets/header_title_arrow.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .text {
      display: inline-block;
      height: 0.5rem;
      line-height: 0.5rem;
    }
  }
  .right {
    display: flex;
    flex: 1;
    text-align: right;
    align-items: center;
    justify-content: end;
    > div {
      display: inline-flex;
      position: relative;
      align-items: center;

      .date {
        display: inline-flex;
        span {
          display: inline-block;
          margin: 0 0.2rem 0 0;
        }
      }
      .user {
        display: inline-flex;
        height: 100%;
        line-height: 0.4rem;
        align-items: center;
        .avatar {
          display: inline-block;
          margin: 0 0.2rem 0 0.1rem;
          width: 0.4rem;
          height: 0.4rem;
          background-image: url("@/assets/header_user.png");
          background-size: contain;
          background-repeat: no-repeat;
          span {
            font-size: 0.4rem;
          }
        }
        .logout {
          display: inline-block;
          margin: 0 0.1rem;
          width: 0.4rem;
          height: 0.4rem;
          span {
            font-size: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
