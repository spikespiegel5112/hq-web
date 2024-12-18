<template>
  <a-modal
    v-model:open="state.visible"
    :title="dialogTitle"
    width="9rem"
    @cancel="handleClose"
  >
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :disabled="props.mode === 'review'"
      :rules="rules"
      :label-col="{ style: { width: '150px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="statisticalDate" label="统计日期">
            <a-date-picker
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.statisticalDate"
              placeholder="情选择"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
            />
            <template v-if="props.mode === 'review'">
              {{ state.formData.statisticalDate }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="statisticalBeginHour" label="统计开始时间">
            <a-time-picker
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.statisticalBeginHour"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              :minute-step="60"
              :second-step="60"
              inputReadOnly
              @change="handleChangeStatisticalBeginHour"
            />
            <template v-if="props.mode === 'review'">
              {{ state.formData.statisticalBeginHour }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="dispersedHourlyPassengerCount" label="小时疏散数">
            <a-input-number
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.dispersedHourlyPassengerCount"
              placeholder="请输入"
              :min="0"
            >
            </a-input-number>
            <template v-if="props.mode === 'review'">
              {{ state.formData.dispersedHourlyPassengerCount }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item
            name="estimatedHourlyArrivePassengerCount"
            label="预测小时到达数"
          >
            <a-input-number
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.estimatedHourlyArrivePassengerCount"
              placeholder="请输入"
            >
            </a-input-number>
            <template v-if="props.mode === 'review'">
              {{ state.formData.estimatedHourlyArrivePassengerCount }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-row>
        <a-col :span="22">
          <template v-if="['edit', 'add'].some((item) => item === props.mode)">
            <a-button key="back" @click="handleClose">取消</a-button>
            <a-button key="submit" type="primary" @click="handleSubmit">
              确认
            </a-button>
          </template>
          <template v-else-if="props.mode === 'review'">
            <a-button key="submit" type="primary" @click="handleClose">
              关闭
            </a-button>
          </template>
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
    id: null as number | null | undefined,
    statisticalBeginHour: null,
    statisticalDate: "",
  } as any,
});

const dialogTitle: ComputedRef<string> = computed(() => {
  return global.$store.state.dictionary.dialogMode.find(
    (item: any) => item.value === props.mode
  )?.title;
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
        if (props.mode === "review") result[item] = false;
      }
      if (dataModelInfo.dataType === "number") {
        result[item].push({ validator: validateNumber, trigger: "change" });
      }
    }
  });
  return result;
});

watch(
  () => props.mode,
  async (newValue: any) => {}
);

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    if (!!newValue) {
      await nextTick();
      if (["edit", "review"].some((item) => item === props.mode)) {
        const formData = JSON.parse(JSON.stringify(props.rowData));

        formData.statisticalBeginHour = global
          .$dayjs(formData.statisticalBeginHour.toString(), "HH")
          .format("HH:mm:ss");

        state.formData = formData;
      }
    }
  }
);

const handleClose = () => {
  formDataRef.value.resetFields();
  emit("onClose");
};

const handleSubmit = () => {
  let statisticalBeginHour = state.formData.statisticalBeginHour;
  statisticalBeginHour = global
    .$dayjs(statisticalBeginHour, "HH:mm:ss")
    .format("HH");
  console.log(statisticalBeginHour);

  statisticalBeginHour = Number(statisticalBeginHour);

  if (props.mode === "add") {
    state.formData.id = undefined;
  }
  formDataRef.value
    .validate()
    .then(() => {
      emit("onSubmit", {
        ...state.formData,
        statisticalBeginHour,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

const handleChangeStatisticalBeginHour = (value: any) => {
  state.formData.statisticalBeginHour = value;
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
