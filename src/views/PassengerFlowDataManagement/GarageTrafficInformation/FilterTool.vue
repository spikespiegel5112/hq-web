<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item name="capPlace" label="出入口">
                <a-select
                  v-model:value="state.formData.capPlace"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in state.capPlaceList"
                    :key="item"
                    :value="item"
                  >
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item name="statisticalTime" label="查询时间">
                <a-range-picker
                  v-model:value="state.statisticalTime"
                  show-time
                  format="YYYY-MM-DD HH:mm:ss"
                  @change="handleChangeStatisticalTime"
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

import { passengerFlowParkingPassengerFlowGetCapPlaceRequest } from "@/api/management";

const emit = defineEmits<{
  (e: "onSearch", formData: object): void;
  (e: "onReset", formData: object): void;
  (e: "update:modelValue", formData: object): void;
}>();

const formDataRef: any = ref(null);

const state = reactive({
  visible: false,
  formData: {
    capPlace: null,
    statisticalTimeBegin: null,
    statisticalTimeEnd: null,
  },
  statisticalTime: [] as any[],
  capPlaceList: [] as string[],
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
  state.formData.statisticalTimeBegin = null;
  state.formData.statisticalTimeEnd = null;
  state.statisticalTime = [];
  emit("onReset", state.formData);
};

const getCapPlaceList = async () => {
  passengerFlowParkingPassengerFlowGetCapPlaceRequest()
    .then((response: any) => {
      state.capPlaceList = response.data;
      state.formData.capPlace = response.data[0];
      emit("onSearch", state.formData);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleChangeStatisticalTime = () => {
  state.formData.statisticalTimeBegin = global
    .$dayjs(state.statisticalTime[0])
    .format("YYYY-MM-DD HH:mm:ss");
  state.formData.statisticalTimeEnd = global
    .$dayjs(state.statisticalTime[1])
    .format("YYYY-MM-DD HH:mm:ss");
};

onMounted(async () => {
  getCapPlaceList();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
