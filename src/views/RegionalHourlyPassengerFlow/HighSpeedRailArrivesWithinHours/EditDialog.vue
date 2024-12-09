<template>
  <a-modal
    v-model:open="state.visible"
    :title="props.mode === 'edit' ? '编辑' : '新增'"
    @cancel="handleClose"
    width="8rem"
  >
    <a-form
      :model="state.formData"
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
              v-model:value="state.formData.statisticalDate"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
          <a-form-item name="dispersedHourlyPassengerCount" label="小时疏散数">
            <a-input
              v-model:value="state.formData.dispersedHourlyPassengerCount"
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
              v-model:value="state.formData.estimatedHourlyArrivePassengerCount"
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

let state = reactive({
  visible: false,
  formData: {
    dispersedHourlyPassengerCount: "",
    estimatedHourlyArrivePassengerCount: "",
    id: "",
    statisticalBeginHour: "",
    statisticalDate: "",
  } as any,
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
      if (props.mode === "edit") {
        state.formData = JSON.parse(JSON.stringify(props.rowData));
      }
    }
  }
);

const handleClose = (event: any) => {
  formDataRef.value.resetFields();
  emit("onClose", event);
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
