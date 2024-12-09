<template>
  <a-modal
    v-model:open="props.visible"
    :title="props.mode === 'edit' ? '编辑' : '新增'"
    @cancel="handleClose"
    width="8rem"
  >
    <a-form
      :model="formData"
      ref="formDataRef"
      autocomplete="off"
      :label-col="{ style: { width: '80px' } }"
    >
      <a-row>
        <a-space
          :size="20"
          :style="{
            width: '100%',
          }"
        >
          <a-form-item name="statisticalDate" label="日期">
            <a-input
              v-model:value="formData.statisticalDate"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
          <a-form-item name="dispersedHourlyPassengerCount" label="小时疏散数">
            <a-input
              v-model:value="formData.dispersedHourlyPassengerCount"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-space>
      </a-row>
      <a-row>
        <a-space
          :size="20"
          :style="{
            width: '100%',
          }"
        >
          <a-form-item
            name="estimatedHourlyArrivePassengerCount"
            label="预测小时到达数"
          >
            <a-input
              v-model:value="formData.estimatedHourlyArrivePassengerCount"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-space>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="tsx" setup>
import { debug } from "console";
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

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();

const emit = defineEmits<{
  (e: "onClose", event: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  mode: { type: String, required: true, default: "" },
  rowData: { type: Object, required: true, default: () => {} },
});

let formData = reactive({
  dispersedHourlyPassengerCount: "",
  estimatedHourlyArrivePassengerCount: "",
  id: "",
  statisticalBeginHour: "",
  statisticalDate: "",
});

watch(
  () => props.mode,
  async (newValue: any) => {
    if (newValue === "add") {
      await nextTick();
      formDataRef.value.resetFields();
    }
  }
);

watch(
  () => props.rowData,
  (newValue: any) => {
    formData = newValue;
  }
);

const handleClose = (event: any) => {
  emit("onClose", event);
};

onMounted(async () => {});

onBeforeUnmount(() => {
  formDataRef.value.resetFields();
});
</script>

<style scoped lang="scss"></style>
