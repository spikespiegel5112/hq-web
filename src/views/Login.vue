<template>
  <div class="login_container" ref="layoutRef">
    <div class="title">虹桥枢纽运行管理一体化平台</div>
    <div class="main">
      <div class="content">
        <label for="">欢迎登录</label>
        <a-form
          ref="formDataRef"
          :model="formDataState"
          autocomplete="off"
          :rules="rules"
        >
          <a-form-item name="username" label="">
            <a-input
              v-model:value="formDataState.username"
              placeholder="请输入帐号"
            >
              <template #prefix>
                <span class="username"></span>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" label="">
            <a-input
              v-model:value="formDataState.password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <span class="password"></span>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="verifycode" label="">
            <a-input
              v-model:value="formDataState.seconds"
              placeholder="请输入验证码"
            >
              <template #suffix>
                <span class="verifycode"></span>
              </template>
            </a-input>
          </a-form-item>
          <a-button
            class="submitbutton"
            type="primary"
            size="large"
            @click="handleLogin"
          >
            登录
          </a-button>
        </a-form>
        <div class="forgetpassword">
          <span>忘记密码？</span>
          <a-button type="link">立即找回</a-button>
        </div>
      </div>
    </div>
    <div class="footer">上海虹桥HOC地产集团</div>
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
import type { Rule } from "ant-design-vue/es/form";

import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";

import { authLoginRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();

const formDataState = reactive({
  username: "",
  password: "",
  seconds: "",
});

const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "change",
    },
  ],
  seconds: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "change",
    },
  ],
};

const handleLogin = () => {
  global.$router.push({
    name: "Dashboard",
  });
  formDataRef.value
    .validate()
    .then((valid: boolean) => {
      submitLogin();
    })
    .catch((error) => {});
};

const submitLogin = () => {
  authLoginRequest(toRaw(formDataState))
    .then((response: any) => {
      debugger;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(async () => {
  init();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background-color: #05061c;
  background-image: url("@/assets/login_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  position: relative;
  .title {
    margin: 1rem 0 0 0;
    font-family: ALiHanYiZhiNengHeiTi-2;
    font-size: 0.75rem;
    color: #fff;
    text-shadow: 0.01rem 0.01rem 0.5rem #5585f4;
  }
  .main {
    width: 100%;
    text-align: right;
    .content {
      display: inline-block;
      margin: 1rem 2rem 0 0;
      padding: 0.2rem;
      width: 8rem;
      height: 8rem;
      border: 1px solid #999;
      border-radius: 0.2rem;
      background-color: rgba(2, 13, 38, 0.7);
      > label {
        display: block;
        margin: 0.5rem 0 0.8rem 0;
        text-align: center;
        font-size: 0.5rem;
        color: #fff;
        font-weight: bold;
      }
      :deep(.ant-form) {
        margin: 0 auto;
        width: 4rem;
        .ant-form-item {
          .ant-form-item-control-input {
            background-color: transparent;

            .ant-form-item-control-input-content {
              background-color: transparent;

              .ant-input-affix-wrapper {
                border: 1px solid #aaa;
                background-color: transparent;
                .ant-input-suffix {
                  display: flex;
                  width: 1rem;
                  height: 0.5rem;
                  align-items: center;
                  .verifycode {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    background-color: red;
                  }
                }
                .ant-input-prefix {
                  display: flex;
                  height: 0.5rem;
                  align-items: center;
                  span {
                    display: inline-block;
                    margin: 0 0.1rem;
                    padding: 0 0.1rem 0 0;
                    width: 0.35rem;
                    height: 0.2rem;
                    background-repeat: no-repeat;
                    background-size: contain;
                    border-right: 1px solid #ccc;
                  }
                  .username {
                    background-image: url("@/assets/login_username.png");
                  }
                  .password {
                    background-image: url("@/assets/login_password.png");
                  }
                }
                .ant-input {
                  background-color: transparent;

                  &::placeholder {
                    color: #ccc;
                  }
                }
              }
            }
          }
        }
      }
      .submitbutton {
        margin: 0.2rem 0 0 0;
        width: 100%;
      }
      .forgetpassword {
        margin: 0.5rem auto 0;
        width: 4rem;
        color: #ccc;
        text-align: center;
        font-size: 0.2rem;
        .a-button {
        }
      }
    }
  }
  .footer {
    margin: 0 0 0.2rem 0;
    width: 100%;
    height: 0.3rem;
    font-size: 0.25rem;
    color: #fff;
    position: absolute;
    bottom: 0;
    text-align: center;
  }
}
</style>
