<template>
  <a-modal
    class="common_dailog_wrapper"
    v-model:open="state.visible"
    width="12rem"
    @cancel="handleClose"
  >
    <template #title>
      <CommonTitle title="事件处置" />
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :rules="rules"
      :label-col="{ style: { width: '120px' } }"
    >
      <a-row>
        <a-col :span="11">
          <a-form-item name="eventType" label="事件类型">
            {{ state.eventType }}
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item name="disposalTime" label="处置时间">
            <a-date-picker
              v-model:value="state.formData.disposalTime"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm:ss"
            ></a-date-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventLevel" label="事件等级">
            <span
              :style="{
                color: global.$getColorInfoByValue(state.formData.eventLevel)
                  ?.color,
              }"
            >
              {{
                global.$getColorInfoByValue(state.formData.eventLevel)?.label
              }}
            </span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="stepOrder" label="处置步骤">
            <a-radio-group
              v-model:value="state.formData.stepOrder"
              class="plan"
              @change="handleChangeDisposalStep"
            >
              <a-radio
                v-for="(item, index) in state.planInfo"
                :value="item.stepOrder"
                :disabled="index < state.disposalData.lastStepOrder"
                :class="{ active: state.formData.stepOrder === item.id }"
              >
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
          <a-form-item name="stepContent" label="处置内容">
            <a-textarea
              v-model:value="state.formData.stepContent"
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
          <a-form-item name="attachment" label="附件">
            <CommonUpload :attachmentList="state.formData.attachmentList" />
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

import {
  eventManageSuddenEventSaveDisposalRequest,
  eventManageSuddenEventGetDisposalRequest,
  preplanPreplanGetStepPageRequest,
  eventManageSuddenEventExportRequest,
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
  dataModel: { type: Array, required: true, default: () => [] },
});

let state = reactive({
  visible: false,
  planInfo: [] as any[],
  eventType: null,
  attachmentList: [
    {
      associationCode: null,
      attachmentName: null,
      attachmentPath: null,
      createBy: null,
      createTime: null,
      id: 0,
      updateBy: null,
      updateTime: null,
    },
  ],
  formData: {
    id: null as number | null | undefined,
    attachmentList: [] as any[],

    disposalTime: null,
    seId: null,
    stepContent: null,
    stepName: null,
    stepOrder: null,
    stepOrderDesc: null,
  } as any,
  fileList: [] as any[],
  disposalData: {} as any,
});

const eventList = computed(() => {
  return global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === global.$store.state.app.emergencyEventType
  )?.data;
});

const rules: Record<string, Rule[]> = {
  disposalTime: [
    {
      required: true,
      message: "请输入响应时间",
      trigger: "change",
    },
  ],
  stepOrder: [
    {
      required: true,
      message: "请选择处置步骤",
      trigger: "change",
    },
  ],
  stepContent: [
    {
      required: true,
      message: "请选择处置内容",
      trigger: "change",
    },
  ],
};

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
        attachmentList: [],
        stepContent: null,
      };
    }
  }
);

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  state.eventType = props.rowData.eventType;
  state.formData.seId = props.rowData.id;
  eventManageSuddenEventGetDisposalRequest({
    seId: props.rowData.id,
  })
    .then((response: any) => {
      response = response.data;
      state.disposalData = response;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const getPlanData = () => {
  const planData: any = eventList.value.find(
    (item: any) => Number(item.value) === props.rowData.prId
  );
  preplanPreplanGetStepPageRequest({
    preplanType: global.$store.state.app.emergencyEventType,
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
  state.formData.id = undefined;
  formDataRef.value
    .validate()
    .then(() => {
      emit("onSubmit", {
        ...state.formData,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleChangeDisposalStep = (value: any) => {
  const planInfo = state.planInfo.find(
    (item: any) => item.stepOrder === value.target.value
  );
  state.formData = {
    ...state.formData,
    stepContent: planInfo.stepContent,
    stepName: planInfo.stepName,
    stepOrder: planInfo.stepOrder,
    stepOrderDesc: planInfo.stepOrderDesc,
  };
};

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
      width: 100%;
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
  .ant-radio-wrapper-disabled {
    color: #666;
  }
  .ant-radio-wrapper-checked {
    color: #0096ff;
    .step_wrapper {
      .stepcontent {
        width: 100%;
        background-color: #0096ff;
        color: #fff;
      }
    }
  }
}
</style>
