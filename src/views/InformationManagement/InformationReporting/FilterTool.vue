<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off">
      <a-row>
        <a-col :span="20">
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-item name="userName" label="上报单位">
                <a-input
                  v-model="state.formData.userName"
                  placeholder="请输入帐号"
                >
                  <template #prefix>
                    <span class="username"></span>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="6">
              <a-form-item name="password" label="类型">
                <a-input
                  v-model="state.formData.password"
                  placeholder="请输入密码"
                >
                  <template #prefix>
                    <span class="password"></span>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="6">
              <a-form-item name="password" label="查询时间">
                <a-input
                  v-model="state.formData.password"
                  placeholder="请输入密码"
                >
                  <template #prefix>
                    <span class="password"></span>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
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

<style scoped lang="scss"></style>
