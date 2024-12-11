<template>
  <div class="common_table_wrapper">
    <a-form
      ref="formDataRef"
      :model="state.formData"
      autocomplete="off"
      :rules="rules"
      :label-col="{ style: { width: '200px' } }"
    >
      <a-space direction="vertical">
        <CommonTitle title="客流國値" />
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item name="username" label="P9进/出场车流阈值">
              <a-input
                v-model:value="state.formData.username"
                placeholder="请输入帐号"
              >
                <template #prefix>
                  <span class="username"></span>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="username" label="P10进/出场车流阈值">
              <a-input
                v-model:value="state.formData.username"
                placeholder="请输入帐号"
              >
                <template #prefix>
                  <span class="username"></span>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item name="username" label="P9进/出场车流阈值">
              <a-input
                v-model:value="state.formData.username"
                placeholder="请输入帐号"
              >
                <template #prefix>
                  <span class="username"></span>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="username" label="P10进/出场车流阈值">
              <a-input
                v-model:value="state.formData.username"
                placeholder="请输入帐号"
              >
                <template #prefix>
                  <span class="username"></span>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <CommonTitle title="客流國値" />
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item name="username" label="P9进/出场车流阈值">
              <a-input
                v-model:value="state.formData.username"
                placeholder="请输入帐号"
              >
                <template #prefix>
                  <span class="username"></span>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="username" label="P10进/出场车流阈值">
              <a-input
                v-model:value="state.formData.username"
                placeholder="请输入帐号"
              >
                <template #prefix>
                  <span class="username"></span>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-space>
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
import type { Rule } from "ant-design-vue/es/form";

import { screenBannerInfoRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  formData: {},
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

const getData = () => {};

const handleSubmit = () => {};
onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
