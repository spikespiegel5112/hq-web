<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="20">
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-item name="userName" label="来源">
                <a-input
                  v-model="formData.userName"
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
                  v-model="formData.password"
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
                  v-model="formData.password"
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
          <a-space>
            <a-button class="submitbutton" @click="handleReset">
              重置
            </a-button>
            <a-button class="submitbutton" type="primary" @click="handleSearch">
              查询
            </a-button>
          </a-space>
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



const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const emit = defineEmits<{
  (e: "onSearch", formData: object): void;
  (e: "onReset", formData: object): void;
}>();

const state = reactive({
  formData: {
    userName: "",
    password: "",
  },
});



const handleSearch = () => {
  emit("onSearch", formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  emit("onReset", formData);
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
