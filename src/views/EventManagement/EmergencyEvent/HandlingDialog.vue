<template>
  <a-modal
    class="common_dailog_wrapper"
    v-model:open="state.visible"
    width="12rem"
    @cancel="handleClose"
  >
    <template #title>
      <span class="square"></span>
      <span></span>
      事件处置
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :label-col="{ style: { width: '120px' } }"
    >
      <a-row>
        <a-col :span="11">
          <a-form-item name="eventType" label="事件类型">
            <!-- <a-select
              v-model:value="state.formData.eventType"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$store.state.dictionary.alarmType"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select> -->
            {{ state.formData.eventType }}
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item name="eventType" label="时间">
            <a-date-picker
              v-if="props.mode === 'edit'"
              v-model:value="state.formData.eventTime"
              placeholder="请输入"
              format="YYYY-MM-DD HH:mm:ss"
            ></a-date-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventTime" label="事件等级"> 红色 </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventLocation" label="处置步骤">
            <a-radio-group
              v-model:value="state.formData.eventLocation"
              :options="['Apple', 'Pear', 'Orange']"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventCode" label="事件编码">
            <a-input
              v-model:value="state.formData.eventCode"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventContent" label="事件内容">
            <a-textarea
              v-model:value="state.formData.eventContent"
              placeholder="请输入"
              :rows="4"
            >
            </a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventStatus" label="事件状态">
            <a-select
              v-model:value="state.formData.eventStatus"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$store.state.dictionary.disposalStatus"
                :key="item.value"
                :value="item.value"
              >
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="attachment" label="附件">
            <a-upload
              v-model:file-list="state.fileList"
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

import {
  preplanPreplanDeleteRequest,
  preplanPreplanSaveRequest,
  preplanPreplanGetStepPageRequest,
} from "@/api/management";

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
  rowData: { type: Object, required: true, default: () => {} },
});

let state = reactive({
  visible: false,
  planInfo: [],
  formData: {
    id: null as number | null | undefined,
    attachmentPath: "",
    createBy: "",
    createTime: "",
    eventCode: "",
    eventContent: "",
    eventLocation: "",
    eventStatus: null,
    eventTime: "",
    eventType: "",
    manageRegion: "",
    updateBy: "",
    updateTime: "",
  } as any,
  fileList: [] as any,
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
      getData();

      const formData = JSON.parse(JSON.stringify(props.rowData));

      state.formData = {
        ...formData,
        eventTime: global.$dayjs(formData.eventTime),
      };
    }
  }
);

const getData = () => {
  preplanPreplanGetStepPageRequest({
    preplanType: "突发事件处置",
    eventType: props.rowData.eventType,
  })
    .then((response: any) => {
      state.planInfo = response;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleClose = () => {
  formDataRef.value.resetFields();
  emit("onClose");
};

const handleChangeEventTime = (date: any) => {};

const handleChangeAttachment = () => {};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
