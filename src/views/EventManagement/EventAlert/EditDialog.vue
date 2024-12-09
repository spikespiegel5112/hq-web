<template>
  <a-modal
    class="common_dailog_wrapper"
    v-model:open="state.visible"
    width="8rem"
    @cancel="handleClose"
  >
    <template #title>
      <span class="square"></span>
      <span></span>
      {{ props.mode === "edit" ? "编辑" : "新增" }}
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :rules="rules"
      :label-col="{ style: { width: '120px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="statisticalDate" label="报警类型">
            <a-select
              placeholder="请选择"
              v-model:value="state.formData.statisticalDate"
            >
              <a-select-option value="全部">全部</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="dispersedHourlyPassengerCount" label="报警时间">
            <a-input
              v-model:value="state.formData.dispersedHourlyPassengerCount"
              placeholder="请输入"
              :min="0"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item
            name="estimatedHourlyArrivePassengerCount"
            label="报警源"
          >
            <a-input-number
              v-model:value="state.formData.estimatedHourlyArrivePassengerCount"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item
            name="estimatedHourlyArrivePassengerCount"
            label="发生地点"
          >
            <a-input-number
              v-model:value="state.formData.estimatedHourlyArrivePassengerCount"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="estimatedHourlyArrivePassengerCount" label="内容">
            <a-input-number
              v-model:value="state.formData.estimatedHourlyArrivePassengerCount"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="estimatedHourlyArrivePassengerCount" label="附件">
            <a-input-number
              v-model:value="state.formData.estimatedHourlyArrivePassengerCount"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-row>
        <a-col :span="22">
          <a-button key="submit" type="primary" @click="handleSubmit">
            确认
          </a-button>
          <a-button key="back" @click="handleClose">取消</a-button>
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

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();

const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSubmit", formData: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  mode: { type: String, required: true, default: "" },
  rowData: { type: Object, required: true, default: () => {} },
  dataModel: { type: Array, required: true, default: () => [] },
});

let state = reactive({
  visible: false,
  formData: {
    dispersedHourlyPassengerCount: null,
    estimatedHourlyArrivePassengerCount: null,
    id: null,
    statisticalDate: "",
  } as any,
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
    if (!!newValue) {
      await nextTick();
      if (props.mode === "edit") {
        state.formData = JSON.parse(JSON.stringify(props.rowData));
      }
    }
  }
);

const handleClose = () => {
  formDataRef.value.resetFields();
  emit("onClose");
};

const handleSubmit = (event: any) => {
  formDataRef.value
    .validate()
    .then(() => {
      if (props.mode === "add") {
        state.formData.id = undefined;
      }
      emit("onSubmit", state.formData);
      emit("onClose");
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
