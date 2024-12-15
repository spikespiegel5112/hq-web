<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="20">
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-item name="eventType" label="报警类型">
                <a-input
                  v-model:value="state.formData.eventType"
                  placeholder="请输入帐号"
                >
                  <template #prefix>
                    <span class="username"></span>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="6">
              <a-form-item name="eventContent" label="报警内容">
                <a-input
                  v-model:value="state.formData.eventContent"
                  placeholder="请输入"
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="6">
              <a-form-item name="eventTime" label="时间">
                <a-input
                  v-model:value="state.formData.eventTime"
                  placeholder="请输入"
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="6">
              <a-form-item name="eventLocation" label="报警源">
                <a-input
                  v-model:value="state.formData.eventLocation"
                  placeholder="请输入"
                >
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

const formDataRef: any = ref(null);

const state = reactive({
  formData: {
    eventType: "",
    eventTime: "",
    eventContent: "",
    eventLocation: "",
  } as any,
});

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  const formData: any = Object.keys(state.formData).forEach((item: any) => {
    state.formData[item] = global.$isEmpty(state.formData[item])
      ? undefined
      : state.formData[item];
  });
  emit("onReset", formData);
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
