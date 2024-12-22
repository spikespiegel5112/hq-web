<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="16rem">
    <template #title>
      <div class="common_dislogtitle_item">
        <span class="sequre"></span>
        <span class="text"> {{ dialogTitle }}</span>
      </div>
    </template>
    <div class="maincontent">
      <a-row>
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
                  <a-form-item label="来源">
                    {{ state.formData.planSource }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="22">
                  <a-form-item label="预案类型">
                    {{
                      eventList.find(
                        (item) =>
                          Number(item.value) ===
                          state.formData.preplanResourceId
                      )?.label
                    }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="22">
                  <a-form-item label="预案内容">
                    {{ state.formData.planContent }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="22">
                  <a-form-item label="预案等级">
                    {{
                      global
                        .$getDictionary("planLevel")
                        .find((item) => item.value === state.formData.planLevel)
                        ?.label
                    }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="22">
                  <a-form-item label="发生时间">
                    {{
                      global
                        .$dayjs(state.formData.planTime)
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="22">
                  <a-form-item label="状态">
                    {{
                      global
                        .$getDictionary("planStatus")
                        .find(
                          (item) => item.value === state.formData.planStatus
                        )?.label
                    }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="22">
                  <a-form-item label="附件">
                    <CommonUpload
                      disabled
                      :attachmentList="state.formData.attachmentList"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="date"></div>
          <vue-scroll class="right">
            <a-timeline mode="left">
              <a-timeline-item v-for="(item, index) in state.planInfo">
                <template #dot>
                  <span>{{ index + 1 }}</span>
                </template>
                <div class="node">
                  <div class="time">
                    {{ global.$dayjs(item.disposalTime).format("HH:mm") }}
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
                      {{ item.stepContent }}
                    </div>
                    <div
                      v-if="
                        !!state.fileList[index] &&
                        !!state.fileList[index].attachmentList &&
                        state.fileList[index].attachmentList.length > 0
                      "
                      class="attachment"
                    >
                      <CommonUpload
                        disabled
                        :attachmentList="state.fileList[index].attachmentList"
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
        <a-col :span="22">
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
  eventManageSuddenEventSaveDisposalRequest,
  eventManageSuddenEventGetDisposalRequest,
  preplanPreplanGetStepPageRequest,
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
  mode: { type: String, required: true, default: "" },
  rowData: { type: Object, required: true, default: () => {} },
});

const state = reactive({
  visible: false,
  preplanListReady: false,
  formData: {
    id: null as number | null | undefined,
    attachmentList: [] as any[],
    eventCode: "",
    eventContent: "",
    eventLocation: "",
    eventStatus: null,
    eventTime: "",
    eventType: "",
    eventLevel: null,
  } as any,
  fileList: [] as any,
  disposalData: {},
  timer: false,
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
      let rowData = JSON.parse(JSON.stringify(props.rowData));
      rowData = {
        ...rowData,
        eventTime: !!rowData.eventTime
          ? global.$dayjs(rowData.eventTime, "YYYY-MM-DD HH:mm:ss")
          : null,
      };
      state.formData = rowData;
      getData();
    }
  }
);

const getData = () => {
  state.formData.eventType = props.rowData.eventType;
  state.formData.seId = props.rowData.id;
  eventManageSuddenEventGetDisposalRequest({
    seId: props.rowData.id,
  })
    .then(async (response: any) => {
      response = response.data;
      state.disposalData = response;
      await nextTick();

      response.preplanResourceStepList.forEach((item: any, index: number) => {
        state.fileList.push(getCurrentStep(item));
      });

      console.log(state.disposalData.preplanResourceStepList);
      state.preplanListReady = true;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleClose = () => {
  formDataRef.value.resetFields();
  state.fileList = [];
  emit("onClose");
};

const handleChangeTime1 = () => {};

const getCurrentStep = (currentPreplanData: any) => {
  const disposalList = state.disposalData.disposalList;
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
  .left {
    display: inline-block;
    width: 7rem;
  }

  .right {
    display: inline-block;
    flex: 1;
    .node {
      display: flex;
      width: 100%;
      .time {
        display: inline-block;
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
</style>
