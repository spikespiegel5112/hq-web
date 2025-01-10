<template>
  <a-modal v-model:open="state.visible" width="11rem" @cancel="handleClose">
    <template #title>
      <CommonTitle title="新增汇总数据" />
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :rules="rules"
      :label-col="{ style: { width: '150px' } }"
    >
      <a-row>
        <a-col :span="11">
          <a-form-item
            name="estimatedDepartedTodayTrainsCount"
            label="今日出发列次"
          >
            <a-input-number
              v-model:value="state.formData.estimatedDepartedTodayTrainsCount"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item
            name="estimatedDepartedTodayPassengerCount"
            label="今日出发人数"
          >
            <a-input-number
              v-model:value="
                state.formData.estimatedDepartedTodayPassengerCount
              "
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="11">
          <a-form-item
            name="estimatedArrivedTodayTrainsCount"
            label="今日到达列次"
          >
            <a-input-number
              v-model:value="state.formData.estimatedArrivedTodayTrainsCount"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item
            name="estimatedArrivedTodayPassengerCount"
            label="今日到达人数"
          >
            <a-input-number
              v-model:value="state.formData.estimatedArrivedTodayPassengerCount"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="11">
          <a-form-item
            name="estimatedDepartedTodayFlightCount"
            label="今日出港架次"
          >
            <a-input-number
              v-model:value="state.formData.estimatedDepartedTodayFlightCount"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item
            name="estimatedDepartedTodayFlightPassengerCount"
            label="今日出港人数"
          >
            <a-input-number
              v-model:value="
                state.formData.estimatedDepartedTodayFlightPassengerCount
              "
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="11">
          <a-form-item
            name="estimatedArrivedTodayFlightCount"
            label="今日进港架次"
          >
            <a-input-number
              v-model:value="state.formData.estimatedArrivedTodayFlightCount"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item
            name="estimatedArrivedTodayFlightPassengerCount"
            label="今日进港人数"
          >
            <a-input-number
              v-model:value="
                state.formData.estimatedArrivedTodayFlightPassengerCount
              "
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="content" label="内容">
            <a-textarea
              v-model:value="state.content"
              format="YYYY-MM-DD"
              :rows="5"
            ></a-textarea>
            <a-button type="primary" @click="handleIdentification">
              识别
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-row>
        <a-col :span="22">
          <a-button key="back" @click="handleClose">取消</a-button>
          <a-button key="submit" type="primary" @click="handleSubmit">
            确认
          </a-button>
        </a-col>
      </a-row>
    </template>
  </a-modal>
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
  onUnmounted,
} from "vue";

import type { Rule, RuleObject } from "ant-design-vue/es/form";

import { backendRailwayArriveImportTodayFlowByStringRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();

const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSubmit", formData: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  rowData: { type: Object, required: false, default: () => {} },
  dataModel: { type: Array, required: false, default: () => [] },
});

let state = reactive({
  visible: false,
  formData: {
    id: null as number | null | undefined,
    estimatedArrivedTodayFlightCount: null,
    estimatedArrivedTodayFlightPassengerCount: null,
    estimatedArrivedTodayPassengerCount: null,
    estimatedArrivedTodayTrainsCount: null,
    estimatedDepartedTodayFlightCount: null,
    estimatedDepartedTodayFlightPassengerCount: null,
    estimatedDepartedTodayPassengerCount: null,
    estimatedDepartedTodayTrainsCount: null,
    statisticalDate: null,
  } as any,
  content: "",
});

const rules: ComputedRef<RuleObject[]> = computed(() => {
  const validateNumber = (rule: any, value: any, callback: any) => {
    if (isNaN(Number(value))) {
      callback(new Error("请输入数字值"));
    } else {
      callback();
    }
  };
  const result: any = {};
  Object.keys(state.formData).forEach((item) => {
    const dataModelInfo = props.dataModel.find(
      (item2: any) => item2.name === item
    ) as any;
    if (!!dataModelInfo) {
      result[item] = [];
      if (dataModelInfo.required) {
        result[item].push({
          required: true,
          message: "请输入" + dataModelInfo.label,
          trigger: "change",
        });
      }
      if (dataModelInfo.dataType === "number") {
        result[item].push({ validator: validateNumber, trigger: "change" });
      }
    }
  });
  return result;
});

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
  }
);

const handleClose = () => {
  formDataRef.value.resetFields();
  emit("onClose");
};

const handleSubmit = () => {
  // statisticalBeginHour = Number(statisticalBeginHour);
  let statisticalDate = global
    .$dayjs(state.formData.statisticalDate)
    .format("YYYY-MM-DD");

  formDataRef.value
    .validate()
    .then(() => {
      emit("onSubmit", {
        ...state.formData,
        // statisticalBeginHour,
        statisticalDate,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

const handleIdentification = () => {
  // 【枢纽应急响应中心】1月7日，虹桥高铁预计今日出发424列次、15.4万人，到达429列次、13.1万人；虹桥机场预计今日出港372架次、6.02万人，进港376架次、6.07万人。
  backendRailwayArriveImportTodayFlowByStringRequest({
    dataStr: state.content,
  })
    .then((response: any) => {
      response = response.data;
      state.formData = {
        ...state.formData,
        estimatedArrivedTodayFlightCount:
          response.estimatedArrivedTodayFlightCount,
        estimatedArrivedTodayFlightPassengerCount:
          response.estimatedArrivedTodayFlightPassengerCount,
        estimatedArrivedTodayPassengerCount:
          response.estimatedArrivedTodayPassengerCount,
        estimatedArrivedTodayTrainsCount:
          response.estimatedArrivedTodayTrainsCount,
        estimatedDepartedTodayFlightCount:
          response.estimatedDepartedTodayFlightCount,
        estimatedDepartedTodayFlightPassengerCount:
          response.estimatedDepartedTodayFlightPassengerCount,
        estimatedDepartedTodayPassengerCount:
          response.estimatedDepartedTodayPassengerCount,
        estimatedDepartedTodayTrainsCount:
          response.estimatedDepartedTodayTrainsCount,
        statisticalDate: response.statisticalDate,
      };
      global.$message.success("识别完成");
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
