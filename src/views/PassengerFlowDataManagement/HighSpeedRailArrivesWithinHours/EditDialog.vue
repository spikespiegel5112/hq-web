<template>
  <a-modal v-model:open="state.visible" width="9rem" @cancel="handleClose">
    <template #title>
      <CommonTitle :title="dialogTitle" />
    </template>
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
              show-time
            />
            <template v-if="props.mode === 'review'">
              {{
                global
                  .$dayjs(state.formData.statisticalDate)
                  .format("YYYY年M月DD日")
              }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="statisticalBeginHour" label="统计开始时间">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.statisticalBeginHour"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$getDictionary(
                  'railway_statistical_begin_hour'
                )"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{
              global.$getDictionary(
                  'railway_statistical_begin_hour'
                ).find((item:any)=>item.value===state.formData.statisticalBeginHour)?.label
              }}
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
          <template
            v-if="
              ['edit', 'add', 'disposal'].some((item) => item === props.mode)
            "
          >
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
  mode: { type: [String, null], required: true, default: null },
  rowData: { type: Object, required: true, default: () => {} },
  dataModel: { type: Array, required: true, default: () => [] },
});

let state = reactive({
  visible: false,
  formData: {
    id: null as number | null | undefined,
    dispersedHourlyPassengerCount: null,
    estimatedHourlyArrivePassengerCount: null,
    railwayArrive: null,
    railwayDeparture: null,
    statisticalBeginHour: null,
    statisticalDate: null,
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
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    if (!!newValue) {
      await nextTick();
      if (["edit", "review", "disposal"].some((item) => item === props.mode)) {
        const formData = JSON.parse(JSON.stringify(props.rowData));
        formData.statisticalDate = global.$dayjs(formData.statisticalDate);
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
  // statisticalBeginHour = Number(statisticalBeginHour);
  let statisticalDate = global
    .$dayjs(state.formData.statisticalDate)
    .format("YYYY-MM-DD");

  if (props.mode === "add") {
    state.formData.id = undefined;
  }
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

const handleChangeStatisticalBeginHour = (value: any) => {
  state.formData.statisticalBeginHour = value;
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
