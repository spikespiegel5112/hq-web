<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="3">
              <a-form-item name="nickName" label="昵称">
                <a-input
                  v-model:value="state.formData.nickName"
                  placeholder="请输入"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item name="phoneNumber" label="手机号">
                <a-input
                  v-model:value="state.formData.phoneNumber"
                  placeholder="请输入"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item name="userStatus" label="用户状态">
                <a-select
                  v-model:value="state.formData.userStatus"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in global.$getDictionary('userStatus')"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item name="username" label="用户名">
                <a-input
                  v-model:value="state.formData.username"
                  placeholder="请输入"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="9">
              <a-form-item name="loginTime" label="登录时间">
                <el-date-picker
                  type="datetimerange"
                  placeholder="请选择"
                  v-model="state.loginTime"
                  @change="handleChangeTime1"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="3" class="operation">
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
  (e: "update:modelValue", formData: object): void;
}>();

const formDataRef: any = ref(null);

const state = reactive({
  formData: {
    loginTimeEnd: null,
    loginTimeStart: null,
    nickName: null,
    phoneNumber: null,
    userStatus: null,
    username: null,
  },
  loginTime: null,
});

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  emit("onReset", state.formData);
};

const handleChangeTime1 = (date: any) => {
  state.formData.loginTimeStart = global
    .$dayjs(date[0])
    .format("YYYY-MM-DD HH:mm:ss");
  state.formData.loginTimeEnd = global
    .$dayjs(date[1])
    .format("YYYY-MM-DD HH:mm:ss");
};

onMounted(async () => {
  emit("update:modelValue", state.formData);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
