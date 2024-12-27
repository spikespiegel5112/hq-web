<template>
  <div class="operationmanagementconfigurment">
    <a-form
      ref="formDataRef"
      :model="state.formData"
      autocomplete="off"
      :label-col="{ style: { width: '170px' } }"
    >
      <a-space
        direction="vertical"
        :style="{
          width: '100%',
        }"
      >
        <CommonTitle title="客流阈值" />
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item name="username" label="蓄车场南存车数">
              <a-row>
                <a-col
                  :span="8"
                  v-for="(key, index) in ['green', 'yellow', 'red']"
                  :key="index"
                >
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData[
                          `passenger_flow_threshold_south_parking_lot_parking_count_${key}`
                        ]
                      "
                      :class="key"
                      placeholder="请输入"
                    />
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="P9坡道拥堵车辆数">
              <a-row>
                <a-col
                  :span="8"
                  v-for="(key, index) in ['green', 'yellow', 'red']"
                  :key="index"
                >
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData[
                          `passenger_flow_threshold_p9_ramp_congested_vehicle_count_${key}`
                        ]
                      "
                      :class="key"
                      placeholder="请输入"
                    />
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="p9出入口拥堵车辆数">
              <a-row>
                <a-col
                  :span="8"
                  v-for="(key, index) in ['green', 'yellow', 'red']"
                  :key="index"
                >
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData[
                          `passenger_flow_threshold_p9_entrance_and_exit_congested_vehicle_count_${key}`
                        ]
                      "
                      :class="key"
                      placeholder="请输入"
                    />
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <CommonTitle title="客流阈值" />
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item name="username" label="蓄车场南存车数">
              <a-row>
                <a-col
                  :span="8"
                  v-for="(key, index) in ['green', 'yellow', 'red']"
                  :key="index"
                >
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData[
                          `passenger_flow_threshold_south_parking_lot_parking_count_${key}`
                        ]
                      "
                      :class="key"
                      placeholder="请输入"
                    />
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="P9坡道拥堵车辆数">
              <a-row>
                <a-col
                  :span="8"
                  v-for="(key, index) in ['green', 'yellow', 'red']"
                  :key="index"
                >
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData[
                          `passenger_flow_threshold_p9_ramp_congested_vehicle_count_${key}`
                        ]
                      "
                      :class="key"
                      placeholder="请输入"
                    />
                  </a-form-item-rest>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="username" label="p9出入口拥堵车辆数">
              <a-row>
                <a-col
                  :span="8"
                  v-for="(key, index) in ['green', 'yellow', 'red']"
                  :key="index"
                >
                  <a-form-item-rest>
                    <a-input
                      v-model:value="
                        state.formData[
                          `passenger_flow_threshold_p9_entrance_and_exit_congested_vehicle_count_${key}`
                        ]
                      "
                      :class="key"
                      placeholder="请输入"
                    />
                  </a-form-item-rest>
                </a-col>
              </a-row>
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
      console.log(response);
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
      console.log(response);
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
.common_tab_container {
  background-color: transparent !important;
}
.operationmanagementconfigurment {
  margin: 0.1rem 0;
  padding: 0.3rem 0;
  background-color: #010f27;
  .ant-input {
    &.green {
      background-color: rgba(114, 241, 1, 0.2);
      border-color: rgba(114, 241, 1, 0.8);
    }
    &.yellow {
      background-color: rgba(255, 234, 0, 0.2);
      border-color: rgba(255, 234, 0, 0.8);
    }
    &.red {
      background-color: rgba(255, 36, 0, 0.2);
      border-color: rgba(255, 36, 0, 0.8);
    }
  }
}
</style>
