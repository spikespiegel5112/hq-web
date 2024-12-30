<template>
  <div class="configurationcommon common_tab_container">
    <a-form
      ref="formDataRef"
      autocomplete="off"
      :label-col="{ style: { width: '200px' } }"
    >
      <a-space
        direction="vertical"
        :style="{
          width: '100%',
        }"
      >
        <CommonTitle title="订阅" />
        <a-row :gutter="20" v-for="item in state.subscribeConfigList">
          <a-form-item :label="item.label">
            <a-button
              v-if="item.configValue === 0"
              type="primary"
              @click="handleSubscribe(item)"
            >
              订阅
            </a-button>
            <a-button
              v-else-if="item.configValue === 1"
              class="cancelsubscribe"
              type="primary"
              @click="handleSubscribe(item)"
            >
              取消订阅
            </a-button>
          </a-form-item>
        </a-row>
        <CommonTitle title="事件灯" />
        <a-row :gutter="20">
          <a-col :span="24">
            <a-form-item name="" label="">
              <a-radio-group
                v-model:value="state.alarmFormData.configValue"
                @change="handleChangeAlarmFormData"
              >
                <a-radio v-for="item in alarmList" :value="item.value">
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-space>
    </a-form>
  </div>
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
  operationManagementOperationConfigConfigRequest,
  operationManagementOperationConfigSubscribeConfigRequest,
  operationManagementOperationConfigGetCommonListRequest,
  operationManagementOperationConfigGetListRequest,
} from "@/api/management.ts";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  dateType: {
    type: [String, Number],
    default: null,
    required: false,
  },
  activeTabId: {
    type: [String, Number],
    default: null,
    required: false,
  },
});

const dataIndex = [] as any[];

const alarmList = ref([
  {
    label: "自动",
    value: 0,
  },
  {
    label: "红灯",
    value: 1,
  },
  {
    label: "黄灯",
    value: 2,
  },
  {
    label: "绿灯",
    value: 3,
  },
]);

const state = reactive({
  visible: false,
  subscribeConfigList: [
    {
      label: "区域人数统计订阅",
      configCode: "subscribe_region_person_count_statistics_subscribe",
      configValue: null,
      id: null,
    },
    {
      label: "多拌线进出人数统计订阅",
      configCode:
        "subscribe_more_mixing_line_in_and_out_person_count_statistics_subscribe",
      configValue: null,
      id: null,
    },
    {
      label: "单拌线进出人数统计订阅",
      configCode:
        "subscribe_single_mixing_line_in_and_out_person_count_statistics_subscribe",
      configValue: null,
      id: null,
    },
    {
      label: "行为告警数据订阅",
      configCode: "subscribe_behavior_alarm_data_subscribe",
      configValue: null,
      id: null,
    },
  ],
  alarmFormData: {
    configCode: "big_screen_alarm_light_control",
    configValue: null,
    id: null,
  },
  loading: false,
});

let queryFormData = reactive({
  dateType: null,
} as any);

watch(
  () => props.dateType,
  (newValue: any, oldValue: any) => {}
);

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  operationManagementOperationConfigGetCommonListRequest()
    .then((response: any) => {
      response = response.data;
      response.forEach((item: any) => {
        if (item.configCode === state.alarmFormData.configCode) {
          state.alarmFormData.configValue = item.configValue;
          state.alarmFormData.id = item.id;
        }
        state.subscribeConfigList.forEach((item2: any) => {
          if (item2.configCode === item.configCode) {
            item2.configValue = item.configValue;
            item2.id = item.id;
          }
        });
      });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleSubscribe = (item: any) => {
  item.configValue = item.configValue === 0 ? 1 : 0;
  operationManagementOperationConfigSubscribeConfigRequest({
    configCode: item.configCode,
    configValue: item.configValue,
    id: item.id,
  })
    .then((response: any) => {
      global.$message.success("修改成功");
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("修改失败");
    });
};

const handleChangeAlarmFormData = (value: any) => {
  operationManagementOperationConfigConfigRequest([state.alarmFormData])
    .then((response: any) => {
      global.$message.success("修改成功");
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("修改失败");
    });
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.configurationcommon {
  padding: 0.3rem;
  .cancelsubscribe {
    background-color: orange;
  }
}
</style>
