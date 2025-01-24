<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="9rem">
    <template #title>
      <CommonTitle :title="dialogTitle" />
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :label-col="{ style: { width: '120px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventType" label="事件类型">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.eventType"
              placeholder="请输入"
            >
            </a-input>
            <template v-if="props.mode === 'review'">
              {{ state.formData.eventType }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="22">
          <a-form-item name="manageRegion" label="管理区域">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.manageRegion"
              placeholder="请选择"
            >
            </a-input>
            <template v-if="props.mode === 'review'">
              {{ state.formData.manageRegion }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventLocation" label="详细地址">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.eventLocation"
              placeholder="请输入"
            >
            </a-input>
            <template v-if="props.mode === 'review'">
              {{ state.formData.eventLocation }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventContent" label="事件内容">
            <a-textarea
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.eventContent"
              placeholder="请输入"
              :rows="4"
            >
            </a-textarea>
            <template v-if="props.mode === 'review'">
              {{ state.formData.eventContent }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventTime" label="发生时间">
            <a-date-picker
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.eventTime"
              format="YYYY-MM-DD HH:mm:ss"
              show-time
            ></a-date-picker>
            <template v-if="props.mode === 'review'">
              {{
                global
                  .$dayjs(state.formData.eventTime)
                  .format("YYYY-MM-DD HH:mm:ss")
              }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="disposalCompletionTime" label="处置完成时间">
            <a-date-picker
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.disposalCompletionTime"
              format="YYYY-MM-DD HH:mm:ss"
              show-time
            ></a-date-picker>
            <template v-if="props.mode === 'review'">
              {{
                global
                  .$dayjs(state.formData.disposalCompletionTime)
                  .format("YYYY-MM-DD HH:mm:ss")
              }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="attachmentList" label="附件">
            <CommonUpload
              v-if="global.$checkEditable(props.mode)"
              :attachmentList="state.formData.attachmentList"
            />
            <template v-if="props.mode === 'review'">
              <AttachmentReview
                :attachmentList="state.formData.attachmentList"
              />
            </template>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-row>
        <a-col :span="22">
          <a-button key="back" @click="handleClose">取消</a-button>
          <a-button key="submit" type="primary" @click="handleSubmit">
            确认
          </a-button>
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
    attachmentList: [] as any[],
    manageRegion: null,
    eventType: null,
    eventLocation: null,
    eventContent: null,
    eventTime: null,
    bridgeName: null,
    disposalCompletionTime: null,
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
          eventTime: global.$dayjs(rowData.eventTime, "YYYY-MM-DD HH:mm:ss"),
          disposalCompletionTime: global.$dayjs(
            rowData.disposalCompletionTime,
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
  const eventTime = global
    .$dayjs(state.formData.eventTime)
    .format("YYYY-MM-DD HH:mm:ss");
  if (props.mode === "add") {
    state.formData.id = undefined;
  }
  formDataRef.value
    .validate()
    .then(() => {
      emit("onSubmit", {
        ...state.formData,
        eventTime,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
