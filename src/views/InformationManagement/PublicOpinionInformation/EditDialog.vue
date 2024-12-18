<template>
  <a-modal
    v-model:open="state.visible"
    :title="dialogTitle"
    @cancel="handleClose"
    width="9rem"
  >
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :label-col="{ style: { width: '130px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="publicSentimentType" label="舆情类型">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.publicSentimentType"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="publicSentimentSource" label="舆情来源">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.publicSentimentSource"
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
          <a-form-item name="publicSentimentSensitive" label="敏感程度">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.publicSentimentSensitive"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$store.state.dictionary.sensitivity"
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
          <a-form-item name="publicSentimentContent" label="舆情内容">
            <a-textarea
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.publicSentimentContent"
              placeholder="请输入"
            >
            </a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="publicSentimentTime" label="舆情发生时间">
            <a-date-picker
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.publicSentimentTime"
              format="YYYY-MM-DD HH:mm:ss"
              @change="handleChangeInfoReportTime"
            ></a-date-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="keyword" label="关键词">
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
    attachmentAssociationCode: "",
    attachmentList: [] as any[],
    handlingContent: "",
    handlingStatus: null,
    handlingTime: "",
    keyword: "",
    publicSentimentContent: "",
    publicSentimentSensitive: null,
    publicSentimentSource: "",
    publicSentimentTime: "",
    publicSentimentType: "",
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
          publicSentimentTime: global.$dayjs(
            rowData.publicSentimentTime,
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
