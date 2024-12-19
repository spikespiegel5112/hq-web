<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="9rem">
    <template #title>
      <div class="common_dislogtitle_item">
        <span class="sequre"></span>
        <span class="text"> {{ dialogTitle }}</span>
      </div>
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :label-col="{ style: { width: '130px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="complaintRegion" label="投诉区域">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.complaintRegion"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="complaintType" label="投诉类型">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.complaintType"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$store.state.dictionary.complaintType"
                :value="Number(item.value)"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="complaintSensitive" label="敏感程度">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.complaintSensitive"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$store.state.dictionary
                  .complaintSensitive"
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
          <a-form-item name="complaintTime" label="投诉时间">
            <!-- <a-date-picker
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.complaintTime"
              format="YYYY-MM-DD HH:mm:ss"
              @change="handleChangeInfoReportTime"
            ></a-date-picker> -->
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="handlingStatus" label="处置状态">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.handlingStatus"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$store.state.dictionary.disposalStatus"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
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
    complaintRegion: "",
    complaintType: "",
    complaintSensitive: "",
    complaintTime: "",
    handlingStatus: "",
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

const handleChangeInfoReportTime = (value: any) => {};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
