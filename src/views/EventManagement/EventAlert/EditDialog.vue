<template>
  <a-modal
    class="common_dailog_wrapper"
    v-model:open="props.visible"
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
          <a-form-item name="eventType" label="报警类型">
            <a-select
              v-model:value="state.formData.eventType"
              placeholder="请选择"
            >
              <a-select-option value="全部">全部</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventTime" label="报警时间">
            <a-input
              v-model:value="state.formData.eventTime"
              placeholder="请输入"
              :min="0"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventLocation" label="报警源">
            <a-select
              v-model:value="state.formData.eventLocation"
              placeholder="请输入"
            >
              <a-select-option value="全部">全部</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventLocation" label="事件发生地点">
            <a-input-number
              v-model:value="state.formData.eventLocation"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="estimatedHourlyArrivePassengerCount" label="内容">
            <a-textarea
              v-model:value="state.formData.estimatedHourlyArrivePassengerCount"
              placeholder="请输入"
            >
            </a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="estimatedHourlyArrivePassengerCount" label="附件">
            <a-upload
              v-model:file-list="fileList"
              name="file"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :headers="{}"
              @change="handleChangeAttachment"
            >
              <a-button type="primary">
                <upload-outlined></upload-outlined>
                上传
              </a-button>
            </a-upload>
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
import { UploadOutlined } from "@ant-design/icons-vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();
const fileList = ref([]);

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
      if (["edit", "review"].some((item) => item === props.mode)) {
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
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleChangeAttachment = () => {};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
