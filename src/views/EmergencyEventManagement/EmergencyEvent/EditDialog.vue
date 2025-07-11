<template>
  <a-modal
    class="common_dailog_wrapper"
    v-model:open="state.visible"
    width="9rem"
    @cancel="handleClose"
  >
    <template #title>
      <CommonTitle :title="dialogTitle" />
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :disabled="props.mode === 'review'"
      :rules="rules"
      :label-col="{ style: { width: '120px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="manageRegion" label="管理区域">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.manageRegion"
              placeholder="请选择"
              @change="handleChangeEventType"
            >
              <a-select-option
                v-for="item in global.$getDictionary('manageRegion')"
                :key="item.value"
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
          <a-form-item name="eventType" label="事件类型">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.eventType"
              placeholder="请选择"
              @change="handleChangeEventType"
            >
              <a-select-option
                v-for="item in eventList"
                :value="item.label"
                :key="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventLocation" label="具体地址">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.eventLocation"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventLevel" label="事件等级">
            <a-radio-group
              v-model:value="state.formData.eventLevel"
              buttonStyle="solid"
            >
              <a-radio-button
                v-for="item in global.$getDictionary('eventLevel')"
                :value="item.value"
              >
                {{ item.label }}
              </a-radio-button>
            </a-radio-group>
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
          </a-form-item>
        </a-col>
      </a-row>
      <!-- <a-row>
        <a-col :span="22">
          <a-form-item name="eventStatus" label="事件状态">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.eventStatus"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$store.state.dictionary.disposalStatus"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{
                global.$store.state.dictionary.disposalStatus.find(
                  (item:any) => item.value === state.formData.eventStatus
                )?.label
              }}
            </template>
          </a-form-item>
        </a-col>
      </a-row> -->
      <a-row>
        <a-col :span="22">
          <a-form-item name="attachment" label="附件">
            <CommonUpload
              v-if="global.$checkEditable(props.mode)"
              :attachmentList="state.formData.attachmentList"
            />
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
  onUnmounted,
} from "vue";

import type { Rule, RuleObject } from "ant-design-vue/es/form";

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
  mode: { type: [String, null], required: true, default: null },
  rowData: { type: Object, required: true, default: () => {} },
  dataModel: { type: Array, required: true, default: () => [] },
});

let state = reactive({
  visible: false,

  formData: {
    id: null as number | null | undefined,
    attachmentList: [] as any[],
    manageRegion: null,
    eventContent: null,
    eventLocation: null,
    eventStatus: null,
    eventTime: null,
    eventType: null,
    eventLevel: null,
  } as any,
  fileList: [] as any[],
});

const eventList = computed(() => {
  return global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === global.$store.state.app.emergencyEventType
  )?.data;
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
        state.formData = {
          ...formData,
          eventTime: !!formData.eventTime
            ? global.$dayjs(formData.eventTime)
            : null,
        };
      }
    }
  }
);

const handleClose = () => {
  formDataRef.value.resetFields();
  state.formData.attachmentList = [];
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

const handleChangeEventTime = (date: any) => {};

const handleChangeEventType = (value: any, event: any) => {
  state.formData.prId = event.key;
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
