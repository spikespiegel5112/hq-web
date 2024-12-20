<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="16rem">
    <template #title>
      <div class="common_dislogtitle_item">
        <span class="sequre"></span>
        <span class="text"> {{ dialogTitle }}</span>
      </div>
    </template>
    <div class="maincontent">
      <div class="left">
        <a-form
          :model="state.formData"
          ref="formDataRef"
          autocomplete="off"
          :label-col="{ style: { width: '130px' } }"
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
                    v-for="item in global.$store.state.dictionary.manageRegion"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <template v-if="props.mode === 'review'">
                  {{ state.formData.eventType }}
                </template>
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
                <template v-if="props.mode === 'review'">
                  {{ state.formData.eventType }}
                </template>
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
                <template v-if="props.mode === 'review'">
                  {{ state.formData.eventLocation }}
                </template>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="22">
              <a-form-item name="eventLevel" label="等级">
                <a-select
                  v-if="global.$checkEditable(props.mode)"
                  v-model:value="state.formData.eventLevel"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in global.$store.state.dictionary.eventLevel"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <template v-if="props.mode === 'review'">
                  {{ state.formData.eventLocation }}
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
              <a-form-item name="attachment" label="附件">
                <CommonUpload
                  v-if="global.$checkEditable(props.mode)"
                  :attachmentList="state.formData.attachmentList"
                />
                <template v-if="props.mode === 'review'">
                  <CommonUpload
                    disabled
                    :attachmentList="state.formData.attachmentList"
                  />
                </template>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="right">
        <!-- {{state.disposalData}} -->
        <div class="date">
        </div>
        <a-timeline mode="left">
          <a-timeline-item
            v-for="(item, index) in state.disposalData.disposalList"
          >
            <template #dot>
              <span>{{ index + 1 }}</span>
            </template>
            <div class="node">
              <div class="time">
                {{ global.$dayjs(item.disposalTime).format("HH:mm") }}
              </div>
              <div class="content">
                {{ item.stepContent }}
              </div>
            </div>
          </a-timeline-item>
        </a-timeline>
      </div>
    </div>

    <template #footer>
      <a-row>
        <a-col :span="22">
          <template>
            <a-button key="submit" type="primary" @click="handleClose">
              关闭
            </a-button>
            <a-button key="submit" type="primary" @click="handleClose">
              确认
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
  disposalData: [] as any,
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
    .then((response: any) => {
      response = response.data;
      state.disposalData = response;
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleClose = () => {
  formDataRef.value.resetFields();
  emit("onClose");
};

const handleChangeTime1 = () => {};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.maincontent {
  display: flex;
  align-items: top;
  .left {
    display: inline-block;
    width: 7rem;
  }

  .right {
    display: inline-block;
    .node {
      display: flex;
      width: 7rem;
      .time {
        display: inline-block;
        width: 2rem;
      }
      .content {
        display: inline-block;
        flex: 1;
      }
    }
  }
}
</style>
