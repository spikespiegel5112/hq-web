<template>
  <div class="common_jeader_wrapper">
    <div class="title">虹桥枢纽运行管理一体化平台</div>
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
          <span class="avatar">
            <MenuFoldOutlined />
          </span>
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
    required: true,
  },
  stuffDutyList: {
    type: Array,
    default: [],
    required: true,
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
  height: 1rem;
  background-color: transparent;
  background-image: url("@/assets/header_bg.png");
  background-size: 26rem 1rem;
  background-repeat: no-repeat;
  .title {
    width: 6rem;
    font-size: 0.35rem;
    text-align: left;
    font-weight: bold;
    text-shadow: 0.01rem 0.01rem 0.1rem #0040d1;
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
