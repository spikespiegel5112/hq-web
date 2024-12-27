<template>
  <div class="configurationcommon common_tab_container">
    <a-form
      ref="formDataRef"
      :model="state.formData"
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
        <a-row :gutter="20">
          <a-form-item label="区域人数统计订阅">
            <a-button type="primary">订阅</a-button>
          </a-form-item>
        </a-row>
        <a-row :gutter="20">
          <a-form-item label="多拌线进出人数统计订阅">
            <a-button type="primary">订阅</a-button>
          </a-form-item>
        </a-row>
        <a-row :gutter="20">
          <a-form-item label="单拌线进出人数统计订阅">
            <a-button type="primary">订阅</a-button>
          </a-form-item>
        </a-row>
        <a-row :gutter="20">
          <a-form-item label="行为告警数据订阅">
            <a-button type="primary">订阅</a-button>
          </a-form-item>
        </a-row>
        <CommonTitle title="事件灯" />
        <a-row :gutter="20">
          <a-col :span="24">
            <a-form-item name="username" label="蓄车场南存车数">
              <a-radio-group v-model:value="value1" :options="plainOptions" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-space>
    </a-form>

    <a-row justify="end">
      <a-col>
        <a-button type="primary" @click="handleSubmit" :loading="state.loading">
          确认
        </a-button>
      </a-col>
    </a-row>
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
import type { Rule } from "ant-design-vue/es/form";

import {
  operationManagementOperationConfigGetListRequest,
  operationManagementOperationConfigConfigRequest,
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

const state = reactive({
  visible: false,
  formData: {} as any,
  loading: false,
});

let queryFormData = reactive({
  dateType: null,
} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

watch(
  () => props.dateType,
  (newValue: any, oldValue: any) => {}
);

const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "change",
    },
  ],
  seconds: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "change",
    },
  ],
};

const getData = () => {
  operationManagementOperationConfigGetListRequest({
    ...queryFormData,
    ...pagination,
  })
    .then((response: any) => {
      
      response = response.data;
      dataIndex.push(
        ...response.map((item: any) => {
          return {
            id: item.id,
            configCode: item.configCode,
          };
        })
      );
      response.forEach((item: any) => {
        state.formData[item.configCode] = item.configValue;
      });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleSubmit = () => {
  state.loading = true;
  const params = [] as any[];
  Object.keys(state.formData).forEach((item: any) => {
    params.push({
      configCode: item,
      configValue: state.formData[item],
      dateType: props.dateType,
      id: dataIndex.find((item2: any) => item2.configCode === item)?.id,
    });
  });
  operationManagementOperationConfigConfigRequest(params)
    .then((response: any) => {
      
      global.$message.success("提交成功");
      state.loading = false;
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("提交失败");
      state.loading = false;
    });
};

onMounted(async () => {
  queryFormData.dateType = props.dateType;
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.configurationcommon {
  padding: 0.3rem;
}
</style>
