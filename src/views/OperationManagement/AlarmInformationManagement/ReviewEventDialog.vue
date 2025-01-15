<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="16rem">
    <template #title>
      <div class="common_dislogtitle_item">
        <span class="sequre"></span>
        <span class="text"> 查看突发事件</span>
      </div>
    </template>
    <div class="maincontent">
      <a-row :gutter="30">
        <a-col :span="10">
          <div class="left">
            <a-form
              :model="state.formData"
              ref="formDataRef"
              autocomplete="off"
              :label-col="{ style: { width: '130px' } }"
            >
              <a-row>
                <a-col :span="22">
                  <a-form-item label="管理区域">
                    {{ state.formData.manageRegion }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="22">
                  <a-form-item label="事件类型">
                    {{ state.formData.eventType }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="22">
                  <a-form-item label="具体地址">
                    {{ state.formData.eventLocation }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="22">
                  <a-form-item label="等级">
                    <span
                      :style="{
                        color: global.$getColorInfoByValue(
                          state.formData.eventLevel
                        )?.color,
                      }"
                    >
                      {{
                        global.$getColorInfoByValue(state.formData.eventLevel)
                          ?.label
                      }}
                    </span>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="22">
                  <a-form-item label="发生时间">
                    {{
                      global
                        .$dayjs(state.formData.eventTime)
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="22">
                  <a-form-item label="事件内容">
                    {{ state.formData.eventContent }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <a-form-item label="附件">
                    <AttachmentReview
                      :attachmentList="state.formData.attachmentList"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-col>
        <a-col :span="13">
          <div class="date"></div>
          <vue-scroll class="right">
            <a-timeline mode="left">
              <a-timeline-item v-for="(item, index) in state.planInfo">
                <template #dot>
                  <span>{{ index + 1 }}</span>
                </template>
                <div class="node">
                  <div class="time">
                    {{ getDispoaslTime(index) }}
                  </div>
                  <div class="content">
                    <div class="top">
                      <span class="stepname">
                        {{ item.stepName }}
                      </span>
                      <span class="status" v-if="index < currentStepOrder">
                        已完成
                      </span>
                    </div>
                    <div class="stepcontent">
                      {{ state.disposalList.find((item:any)=>item.stepOrder===index+1)?.stepContent }}
                    </div>

                    <div
                      v-if="
                        checkAttachmentIndex(item, index) &&
                        checkAttachmentIndex(item, index).attachmentList
                          .length > 0
                      "
                      class="attachment"
                    >
                      <AttachmentReview
                        :attachmentList="
                          checkAttachmentIndex(item, index).attachmentList
                        "
                      />
                    </div>
                  </div>
                </div>
              </a-timeline-item>
            </a-timeline>
          </vue-scroll>
        </a-col>
      </a-row>
    </div>
    <template #footer>
      <a-row>
        <a-col :span="23">
          <a-button key="submit" type="primary" @click="handleClose">
            关闭
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

import {
  eventManageSuddenEventGetDisposalRequest,
  preplanPreplanGetStepPageRequest,
  eventManageSuddenEventGetRecordPageRequest,
} from "@/api/management";

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
  preplanListReady: false,
  formData: {
    id: null as number | null | undefined,
    attachmentList: [] as any[],
    eventCode: null,
    eventContent: null,
    eventLocation: null,
    eventStatus: null,
    eventTime: null,
    eventType: null,
    eventLevel: null,
    manageRegion: null,
  } as any,
  fileList: [] as any[],
  disposalList: [] as any[],
  disposalData: {} as any,
  timer: false,
  planInfo: [] as any[],
});

const dialogTitle: ComputedRef<string> = computed(() => {
  return global.$store.state.dictionary.dialogMode.find(
    (item: any) => item.value === props.mode
  )?.title;
});

const currentStepOrder = computed(() => {
  let result = 0;
  if (!!state.disposalList) {
    const disposalList = state.disposalList;
    let orderList = disposalList.map((item: any) => item.stepOrder);
    orderList = Array.from(new Set(orderList));
    result = Math.max(...orderList);
  }
  return result;
});

const eventList = computed(() => {
  return global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === global.$store.state.app.emergencyEventType
  )?.data;
});

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    if (!!newValue) {
      await nextTick();
      getData();
    }
  }
);

const getData = async () => {
  global.$store.commit("app/updateTableLoading", true);
  state.formData.eventType = props.rowData.eventType;
  state.formData.seId = props.rowData.id;
  console.log(props.rowData.eventAssociationId)
  eventManageSuddenEventGetRecordPageRequest({
    seId: props.rowData.eventAssociationId,
  })
    .then(async (response: any) => {
      response = response.data;
      const disposalData = response.list[0];
      state.disposalData = disposalData;
      await getStepData(disposalData.prId);
      Object.keys(state.formData).forEach((item: any) => {
        state.formData[item] = disposalData[item];
      });
      eventManageSuddenEventGetDisposalRequest({
        seId: props.rowData.eventAssociationId,
      })
        .then(async (response: any) => {
          response = response.data;
          state.disposalData = response;
          state.disposalList = response.disposalList;
          if (response.preplanResourceStepList) {
            response.preplanResourceStepList.forEach(
              (item: any, index: number) => {
                state.fileList.push(getCurrentStep(item));
              }
            );
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const getStepData = (preplanResourceId: number) => {
  return new Promise((resolve, reject) => {
    const planData: any = eventList.value.find((item: any) => {
      return Number(item.value) === preplanResourceId;
    });

    preplanPreplanGetStepPageRequest({
      prId: preplanResourceId,
      eventType: planData.label,
    })
      .then((response: any) => {
        response = response.data;
        state.planInfo = response.list;
        resolve(response.list);
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
  });
};

const handleClose = () => {
  formDataRef.value.resetFields();
  state.fileList = [];
  emit("onClose");
};

const getDispoaslTime = (index: number) => {
  let result = "";
  const disposalItem = getDispoaslItem(index);
  if (disposalItem) {
    const disposalTime = disposalItem.disposalTime;
    if (!!disposalTime) {
      result = global.$dayjs(disposalItem.disposalTime).format("HH:mm");
    }
  }
  return result;
};

const getDispoaslItem = (index: number) => {
  let result = state.disposalList.find(
    (item: any) => item.stepOrder - 1 === index
  );
  return result;
};

const checkAttachmentIndex: any = (item: any, index: number) => {
  let result = state.fileList.find(
    (item2: any) => item.stepOrder === item2.stepOrder
  );

  return result;
};

const getCurrentStep = (currentPreplanData: any) => {
  const disposalList = state.disposalList;
  let result = {
    attachmentList: [],
  };
  let _result = disposalList.find((item: any) => {
    return currentPreplanData.stepOrder === item.stepOrder;
  });
  return _result || result;
};

onMounted(() => {
  setTimeout(() => {
    state.timer = true;
  }, 2000);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.maincontent {
  display: flex;
  align-items: start;
  .ant-row {
    width: 100%;
    .left {
      display: inline-block;
      width: 100%;
    }
    .right {
      display: inline-block;
      flex: 1;
      max-height: 9rem !important;
      overflow-y: auto;
      .ant-timeline {
        .node {
          display: flex;
          width: 100%;
          .time {
            display: inline-block;
            margin: 0 05rem 0 0 0;
            width: 1rem;
          }
          .content {
            display: inline-block;
            padding: 0.1rem 0.2rem;
            flex: 1;
            background-color: #0a1f44;
            .top {
              display: flex;
              .stepname {
                flex: 1;
                font-size: 0.23rem;
                color: #fff;
              }
              .status {
                display: inline-block;
                width: 1rem;
                text-align: right;
                color: #00ffa8;
              }
            }
            .stepcontent {
              margin: 0.1rem 0;
              width: 5.5rem;
              color: #d6eaff;
            }
            .attachment {
              margin: 0.1rem 0 0 0;
              padding: 0.1rem 0 0 0;
              border-top: 1px solid #01447c;
            }
          }
        }
      }
    }
  }
}
</style>
