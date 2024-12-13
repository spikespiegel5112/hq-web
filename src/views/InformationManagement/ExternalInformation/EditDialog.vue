<template>
  <a-modal
    v-model:open="state.visible"
    :title="dialogTitle"
    @cancel="handleClose"
    width="8rem"
  >
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :label-col="{ style: { width: '130px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="infoCode" label="信息代码">
            <a-input
              v-model:value="state.formData.infoCode"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="22">
          <a-form-item name="infoContent" label="信息内容">
            <a-input
              v-model:value="state.formData.infoContent"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="infoReportUnit" label="信息上报单位">
            <a-input
              v-model:value="state.formData.infoReportUnit"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="infoReportTime" label="信息上报开始时间">
            <a-date-picker
              v-model:value="state.formData.infoReportTime"
              placeholder="请输入"
              format="YYYY-MM-DD HH:mm:ss"
              @change="handleChangeInfoReportTime"
            ></a-date-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="infoLevel" label="信息等级">
            <a-input-number
              v-model:value="state.formData.infoLevel"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="22">
          <a-form-item name="infoType" label="信息类型">
            <a-select
              v-model:value="state.formData.infoType"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$store.state.dictionary[
                  'informationType'
                ]"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="infoStatus" label="信息状态">
            <a-input-number
              v-model:value="state.formData.infoStatus"
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
} from "vue";
import type { Dayjs } from "dayjs";

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
});

const state = reactive({
  visible: false,
  formData: {
    id: null as number | null | undefined,
    attachmentPath: "",
    infoCode: "",
    infoContent: "",
    infoLevel: null,
    infoReportTime: "",
    infoReportUnit: "",
    infoStatus: null,
    infoType: "",
  },
});

const dialogTitle: ComputedRef<string> = computed(() => {
  return global.$store.state.dictionary.dialogMode.find(
    (item: any) => item.value === props.mode
  )?.title;
});

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    if (!!newValue) {
      await nextTick();
      if (["edit", "review"].some((item) => item === props.mode)) {
        let rowData = JSON.parse(JSON.stringify(props.rowData));
        rowData = {
          ...rowData,
          infoReportTime: global.$dayjs(
            rowData.infoReportTime,
            "YYYY-MM-DD HH:mm:ss"
          ),
        };
        state.formData = rowData;
      }
    }
  }
);

const handleClose = () => {
  formDataRef.value.resetFields();
  emit("onClose");
};

const handleSubmit = () => {
  formDataRef.value
    .validate()
    .then(() => {
      if (props.mode === "add") {
        state.formData.id = undefined;
      }
      const infoReportTime = global
        .$dayjs(state.formData.infoReportTime)
        .format("YYYY-MM-DD HH:mm:ss");
      emit("onSubmit", {
        ...state.formData,
        infoReportTime,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
