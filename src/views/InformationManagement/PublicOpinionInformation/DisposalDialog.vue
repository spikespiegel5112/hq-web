<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="9rem">
    <template #title>
           <CommonTitle :title="dialogTitle" />

    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :label-col="{ style: { width: '130px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="publicSentimentSource" label="舆情来源">
            {{ global.$getDictionary("public_sentiment_info_public_sentiment_source").find((item:any)=>item.value===props.rowData.publicSentimentSource)?.label }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="publicSentimentType" label="舆情类型">
            {{ global.$getDictionary("public_sentiment_info_public_sentiment_type").find((item:any)=>item.value===props.rowData.publicSentimentType)?.label }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="publicSentimentContent" label="舆情来源">
            {{ props.rowData.publicSentimentContent }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="handlingTime" label="处置时间">
            <a-date-picker
              v-model:value="state.formData.handlingTime"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              @change="handleChangeTime1"
            ></a-date-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="handlingContent" label="处置情况">
            <a-textarea
              v-model:value="state.formData.handlingContent"
              placeholder="请输入"
              :rows="3"
              allow-clear
            >
            </a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="handlingAttachmentList" label="附件">
            <CommonUpload
              :attachmentList="state.formData.handlingAttachmentList"
            />
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
  mode: { type: [String, null], required: true, default: null },
  rowData: { type: Object, required: true, default: () => {} },
});

const state = reactive({
  visible: false,
  formData: {
    id: null as number | null | undefined,

    handlingContent: null,
    handlingTime: null,
    handlingAttachmentList: [] as any[],
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
      if (["edit", "review", "disposal"].some((item) => item === props.mode)) {
        let rowData = JSON.parse(JSON.stringify(props.rowData));
        rowData = {
          ...rowData,
          handlingTime: !!rowData.handlingTime
            ? global.$dayjs(rowData.handlingTime, "YYYY-MM-DD HH:mm:ss")
            : null,
        };
        Object.keys(state.formData).forEach((item: string) => {
          state.formData[item] = !!rowData[item] ? rowData[item] : undefined;
        });
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
      const handlingTime = global
        .$dayjs(state.formData.handlingTime)
        .format("YYYY-MM-DD HH:mm:ss");
      emit("onSubmit", {
        ...state.formData,
        handlingTime,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleChangeTime1 = () => {};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
