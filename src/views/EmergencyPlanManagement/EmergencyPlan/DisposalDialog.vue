<template>
  <a-modal
    class="common_dailog_wrapper"
    v-model:open="state.visible"
    width="12rem"
    @cancel="handleClose"
  >
    <CommonTitle title="预案处置" />
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :rules="rules"
      :label-col="{ style: { width: '120px' } }"
    >
      <a-row>
        <a-col :span="11">
          <a-form-item name="preplanResourceId" label="预案类型">
            {{ eventList.find((item:any)=>Number(item.value)===props.rowData.preplanResourceId)?.label }}
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item name="disposalTime" label="响应时间">
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
          <a-form-item label="预案等级">
            <span
              :style="{
                color: global.$getColorInfoByValue(props.rowData.planLevel)
                  ?.color,
              }"
            >
              {{ global.$getColorInfoByValue(props.rowData.planLevel)?.label }}
            </span>
          </a-form-item>
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
              <a-radio
                v-for="(item, index) in state.planInfo"
                :value="item.id"
                :disabled="index < currentStepOrder"
                :class="{ active: state.formData.eventLocation === item.id }"
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
  planManagementEmergencyPlanGetDisposalRequest,
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
  mode: { type: [String, null], required: true, default: null },
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
      id: null,
      updateBy: null,
      updateTime: null,
    },
  ],
  formData: {
    id: null as number | null | undefined,
    attachmentList: [] as any[],

    emergencyPlanId: null,

    disposalTime: null,
    stepContent: null,
    stepName: null,
    stepOrder: null,
    stepOrderDesc: null,
    attachmentAssociationCode: null,
  } as any,
  fileList: [] as any[],
  disposalData: {} as any,
});

const rules: Record<string, Rule[]> = {
  disposalTime: [
    {
      required: true,
      message: "请输入响应时间",
      trigger: "change",
    },
  ],
  eventLocation: [
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

const eventList = computed(() => {
  return global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === global.$store.state.app.emergencyPlanType
  )?.data;
});

const currentStepOrder = computed(() => {
  let result = 0;
  if (state.disposalData.disposalList) {
    const disposalList = state.disposalData.disposalList;
    let orderList = disposalList.map((item: any) => item.stepOrder);
    orderList = Array.from(new Set(orderList));
    result = Math.max(...orderList);
  }
  return result;
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
        emergencyPlanId: props.rowData.id,
        attachmentList: [],
        stepContent: null,
        // eventTime: global.$dayjs(props.rowData.eventTime),
      };
    }
  }
);

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  state.eventType = props.rowData.eventType;
  state.formData.id = props.rowData.id;
  planManagementEmergencyPlanGetDisposalRequest({
    id: props.rowData.id,
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
  state.planInfo = [];
  const planData: any = eventList.value.find(
    (item: any) => Number(item.value) === props.rowData.preplanResourceId
  );
  preplanPreplanGetStepPageRequest({
    preplanType: global.$store.state.app.emergencyPlanType,
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
      display: flex;
      align-items: center;
      align-content: center;
    }
    > span:nth-child(2) {
      flex: 1;
    }
    .ant-radio {
      width: 0.3rem;
    }
    .step_wrapper {
      display: flex;
      flex: 1;
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
