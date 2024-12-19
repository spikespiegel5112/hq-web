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
      :rule="rules"
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
          <a-form-item name="disposalTime" label="时间">
            <a-date-picker
              v-model:value="state.formData.disposalTime"
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
              class="plan"
              @change="handleChangeDisposalStep"
            >
              <a-radio v-for="item in state.planInfo" :value="item.id">
                <div class="step_wrapper">
                  <span class="step">
                    {{ item.stepName }}
                  </span>
                  <span class="stepname">
                    {{ item.stepName }}
                  </span>
                  <span class="stepcontent">
                    {{ item.stepContent }}
                  </span>
                </div>
              </a-radio>
            </a-radio-group>
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
import { UploadOutlined } from "@ant-design/icons-vue";

import {
  eventManageSuddenEventSaveDisposalRequest,
  eventManageSuddenEventGetDisposalRequest,
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
  planInfo: [] as any[],
  attachmentList: [
    {
      associationCode: "",
      attachmentName: "",
      attachmentPath: "",
      createBy: "",
      createTime: "2024-12-18T08:51:07.064Z",
      id: 0,
      updateBy: "",
      updateTime: "2024-12-18T08:51:07.064Z",
    },
  ],

  formData: {
    id: null as number | null | undefined,
    attachmentPath: "",
    eventCode: "",
    eventContent: "",
    eventLocation: "",
    eventStatus: null,
    eventTime: "",
    eventType: "",
    manageRegion: "",
    updateBy: "",
    updateTime: "",

    disposalTime: "",
    seId: null,
    stepContent: "",
    stepName: "",
    stepOrder: "",
    stepOrderDesc: "",
  } as any,
  fileList: [] as any,
});

const eventList = computed(() => {
  return global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === "突发事件处置"
  )?.data;
});

const rules: ComputedRef<RuleObject[]> = computed(() => {
  return [];
});

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    if (!!newValue) {
      getData();
      getPlanData();
      const formData = JSON.parse(JSON.stringify(props.rowData));
      state.formData = {
        ...formData,
        eventTime: global.$dayjs(formData.eventTime),
      };
    }
  }
);

const getData = () => {
  state.formData.eventType = props.rowData.eventType;
  state.formData.seId = props.rowData.id;

  eventManageSuddenEventGetDisposalRequest({
    seId: props.rowData.id,
  })
    .then((response: any) => {
      response = response.data;
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const getPlanData = () => {
  console.log(props.rowData);
  const planData: any = eventList.value.find(
    (item: any) => Number(item.value) === props.rowData.prId
  );
  preplanPreplanGetStepPageRequest({
    preplanType: "突发事件处置",
    eventType: planData.label,
  })
    .then((response: any) => {
      response = response.data;
      state.planInfo = response.list;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleClose = () => {
  formDataRef.value.resetFields();
  emit("onClose");
};

const handleSubmit = () => {
  const disposalTime = global
    .$dayjs(state.formData.disposalTime)
    .format("YYYY-MM-DD HH:mm:ss");
  emit("onSubmit", state.formData);
};

const handleChangeDisposalStep = (value: any) => {
  const planInfo = state.planInfo.find(
    (item: any) => item.id === value.target.value
  );
  state.formData = {
    ...state.formData,
    stepContent: planInfo.stepContent,
    stepName: planInfo.stepName,
    stepOrder: planInfo.stepOrder,
    stepOrderDesc: planInfo.stepOrderDesc,
  };
};

const handleChangeAttachment = () => {};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.plan {
  display: block;
  :deep(.ant-radio-wrapper) {
    display: flex;
    align-items: center;
    > span {
      display: inline-flex;
      align-items: center;
      align-content: center;
    }
    .step_wrapper {
      display: flex;
      margin: 0.05rem 0;
      > span {
        align-content: center;
      }
      .ant-radio {
        display: inline-block;
        padding: 0 0.1rem;
      }
      .step {
        display: inline-block;
        padding: 0 0.1rem;
        width: 1.5rem;
      }
      .stepname {
        display: inline-block;
        padding: 0 0.1rem;
        width: 1.5rem;
      }
      .stepcontent {
        padding: 0.1rem;
        flex: 1;
        background-color: #001b4c;
      }
    }
  }
}
</style>
