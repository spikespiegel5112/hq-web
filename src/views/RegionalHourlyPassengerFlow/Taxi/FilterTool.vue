<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off">
      <a-row>
        <a-col :span="20">
          <a-space
            :size="20"
            :style="{
              width: '100%',
            }"
          >
            <a-form-item prop="userName" label="时段">
              <a-input
                v-model="state.formData.userName"
                placeholder="请输入帐号"
              >
                <template #prefix>
                  <span class="username"></span>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item prop="password" label="查询时间">
              <a-input
                v-model="state.formData.password"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <span class="password"></span>
                </template>
              </a-input>
            </a-form-item>
          </a-space>
        </a-col>
        <a-col :span="4" class="operation">
          <a-button class="submitbutton" type="primary" @click="handleSubmit">
            查询
          </a-button>
        </a-col>
      </a-row>
    </a-form>
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

import { screenBannerInfoRequest } from "@/api/screen";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({
  formData: {
    userName: "",
    password: "",
  },
});

const init = () => {
  const lineScaleEl: HTMLElement = document.getElementById("line-scale");
  lineScaleEl.style.display = "none";
};

const handleSubmit = () => {};

onMounted(async () => {
  init();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.common_filtertool_wrapper {
  display: flex;
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
}
</style>
