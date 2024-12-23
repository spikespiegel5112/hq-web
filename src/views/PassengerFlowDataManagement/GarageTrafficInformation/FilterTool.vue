<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="20">
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item name="statisticalBeginHour" label="时段">
                <a-time-picker
                  v-model:value="state.formData.statisticalBeginHour"
                  format="HH:mm:ss"
                  valueFormat="HH"
                  :minute-step="60"
                  :second-step="60"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item name="password" label="查询时间">
                <a-time-range-picker v-model:value="state.formData.ddddd" />
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
  visible: false,
  formData: {
    statisticalBeginHour: null,
  },
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
