<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="7">
              <a-form-item name="cameraName" label="相机名称">
                <a-select
                  v-model:value="state.formData.cameraName"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in state.cameraList"
                    :key="item"
                    :value="item"
                  >
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item name="analyzeTime" label="查询时间">
                <el-date-picker
                  type="datetimerange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="state.analyzeTime"
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
            <a-button
              class="submitbutton"
              type="primary"
              @click="handleSearch"
              :disabled="props.disabled"
            >
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

import { passengerFlowAreaFlowGetCameraNameRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const emit = defineEmits<{
  (e: "onSearch", formData: object): void;
  (e: "onReset", formData: object): void;
  (e: "update:modelValue", formData: object): void;
}>();

const props = defineProps({
  disabled: { type: Boolean, required: false, default: false },
});

const formDataRef: any = ref(null);

const state = reactive({
  visible: false,
  formData: {
    cameraName: null,
    analyzeTimeBegin: null,
    analyzeTimeEnd: null,
  },
  analyzeTime: [] as any[],
  cameraList: null,
});

watch(
  () => state.formData,
  (newValue: any, oldValue: any) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  const startOfDay = global.$dayjs().startOf("month");
  const endOfDay = global.$dayjs();
  state.formData.analyzeTimeBegin = startOfDay.format("YYYY-MM-DD HH:mm:ss");
  state.formData.analyzeTimeEnd = endOfDay.format("YYYY-MM-DD HH:mm:ss");
  state.analyzeTime = [startOfDay, endOfDay];

  emit("onReset", state.formData);
};

const handleChangeTime1 = (date: any) => {
  state.formData.analyzeTimeBegin = global
    .$dayjs(date[0])
    .format("YYYY-MM-DD HH:mm:ss");
  state.formData.analyzeTimeEnd = global
    .$dayjs(date[1])
    .format("YYYY-MM-DD HH:mm:ss");
};

const getCameraList = () => {
  passengerFlowAreaFlowGetCameraNameRequest({})
    .then((response: any) => {
      state.cameraList = response.data;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(async () => {
  getCameraList();
  handleReset();
  emit("update:modelValue", state.formData);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
