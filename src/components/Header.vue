<template>
  <div class="common_jeader_wrapper">
    <div class="background"></div>
    <div class="title">
      <span class="arrow"></span>
      <span class="text">虹桥枢纽运行管理一体化平台</span>
    </div>
    <div class="right">
      <div
        :style="{
          width: '7rem',
          lineHeight: '0.2rem',
        }"
      >
        {{ permissionCodeList }}
      </div>
      <div>
        <div class="date">
          <span>
            {{ state.currentDate }}
          </span>
          <span>
            {{ state.currentTime }}
          </span>
          <span>
            {{ global.$dayjs().format("dddd") }}
          </span>
        </div>
        <div class="user">
          <span class="avatar"> </span>
          <span class="name">{{ userInfo.nickName }}</span>
          <span class="logout">
            <PoweroffOutlined @click="hadleLogout" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { PoweroffOutlined } from "@ant-design/icons-vue";

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
import { authLogoutRequest } from "@/api/auth";

const props = defineProps({
  bannerInfo: {
    type: Object,
    default: {},
    required: false,
  },

  title: {
    type: String,
    default: null,
    required: false,
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  currentTime: null,
  currentDate: null,
  clientWidth: 0,
  bannerInfo: {} as any,
});

const userInfo = computed(() => {
  return global.$store.state.user.userInfo.sysUser;
}) as any;

const permissionCodeList = computed(() => {
  return global.$route.meta.permissionCodeList || [];
});

watch(
  () => props.bannerInfo,
  (newValue: any, oldValue: any) => {}
);

const initClock = () => {
  setInterval(() => {
    state.currentTime = global.$dayjs().format("HH:mm:ss");
    state.currentDate = global.$dayjs().format("YYYY-MM-DD");
  }, 1000);
};

const hadleLogout = () => {
  global.$confirm({
    title: "提示",
    content: "确认登出？",
    onOk: () => {
      authLogoutRequest()
        .then(async (response: any) => {
          global.$message.success("登出成功");
          localStorage.removeItem("token");
          global.$router.push({
            name: "Login",
          });
          await nextTick();
          setTimeout(() => {
            global.$store.commit("user/clearUserInfo");
          }, 1000);
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
  });
};

onMounted(() => {
  initClock();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_jeader_wrapper {
  display: flex;
  margin: 0 0 0.1rem 0;
  padding: 0 0.2rem 0 0.2rem;
  height: 0.8rem;
  position: relative;
  z-index: 1;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1rem;
    background-color: transparent;
    background-image: url("@/assets/header_bg.png");
    background-size: 24rem 1rem;
    background-repeat: no-repeat;
  }
  .title {
    display: flex;
    align-items: center;
    width: 7rem;
    font-size: 0.35rem;
    text-align: left;
    font-weight: bold;
    text-shadow: 0.01rem 0.01rem 0.1rem #0040d1;
    z-index: 1;
    .arrow {
      display: inline-block;
      margin: 0 0.3rem 0 0.1rem;
      width: 1.3rem;
      height: 1rem;
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
