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
      预案处置
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
          <a-form-item name="preplanResourceId" label="预案类型">
            {{ eventList.find((item:any)=>Number(item.value)===props.rowData.preplanResourceId)?.label }}
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
          <a-form-item name="eventTime" label="预案等级">
            {{
              global
                .$getDictionary("planLevel")
                .find((item) => item.value === props.rowData.planLevel)?.label
            }}
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
      createTime: "",
      id: null,
      updateBy: "",
      updateTime: "",
    },
  ],

  formData: {
    id: null as number | null | undefined,
    attachmentList: [] as any[],
    attachmentPath: "",

    emergencyPlanId: null,
    disposalResponseTime: null,

    disposalTime: "",
    stepContent: "",
    stepName: "",
    stepOrder: "",
    stepOrderDesc: "",
    attachmentAssociationCode: "",
  } as any,
  fileList: [] as any,
  disposalData: {} as any,
});

const colorList: any[] = [
  {
    label: "红色",
    color: "red",
  },
  {
    label: "黄色",
    color: "yellow",
  },
  {
    label: "绿色",
    color: "green",
  },
];

const eventList = computed(() => {
  return global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === "应急预案处置"
  )?.data;
});

const currentStepOrder = computed(() => {
  console.log(state.disposalData);
  const disposalList = state.disposalData.disposalList;
  let orderList = disposalList.map((item: any) => item.stepOrder);
  orderList = Array.from(new Set(orderList));
  const result = Math.max(...orderList);
  return result;
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
      state.formData = {
        ...state.formData,
        id: props.rowData.id,
        emergencyPlanId: props.rowData.id,
        eventTime: global.$dayjs(props.rowData.eventTime),
      };
    }
  }
);

const getData = () => {
  state.formData.eventType = props.rowData.eventType;
  state.formData.id = props.rowData.id;
  planManagementEmergencyPlanGetDisposalRequest({
    id: props.rowData.id,
  })
    .then((response: any) => {
      response = response.data;
      state.disposalData = response;
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const getPlanData = () => {
  console.log(props.rowData);
  console.log(eventList.value);
  console.log(global.$store.state.app.currentEventTypeList);

  const planData: any = eventList.value.find((item: any) => {
    return Number(item.value) === props.rowData.preplanResourceId;
  });
  preplanPreplanGetStepPageRequest({
    preplanType: "应急预案处置",
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
  emit("onSubmit", {
    ...state.formData,
  });
  handleClose();
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

const getColor = () => {
  let eventLevel: any[] = global.$store.state.dictionary.eventLevel;
  eventLevel = eventLevel.map((item: any) => {
    return {
      ...item,
      color: colorList.find((item2: any) => item2.title === item.label),
    };
  });
  const colorItem = global.$store.state.dictionary.eventLevel.find(
    (item) => item.value === state.formData.eventLevel
  );
  return colorItem;
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
