<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="20">
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-item name="infoReportUnit" label="信息上报单位">
                <a-input
                  v-model:value="state.infoReportTime"
                  placeholder="请输入"
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="6">
              <a-form-item name="infoType" label="信息类型">
                <a-select
                  v-model:value="state.formData.infoType"
                  placeholder="请输入"
                >
                  <a-select-option
                    v-for="item in global.$store.state.dictionary[
                      'informationType'
                    ]"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item name="infoReportTime" label="信息上报时间">
                <a-range-picker
                  v-model:value="state.infoReportTime"
                  format="YYYY-MM-DD"
                  @change="handleChangeInfoReportTime"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="4" class="operation">
          <a-space>
            <a-button class="submitbutton" @click="handleReset">
              重置
            </a-button>
            <a-button class="submitbutton" type="primary" @click="handleSearch">
              查询
            </a-button>
          </a-space>
        </a-col>
      </a-row>
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

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const emit = defineEmits<{
  (e: "onSearch", formData: object): void;
  (e: "onReset", formData: object): void;
}>();

const formDataRef: any = ref(null);

const state = reactive({
  infoReportTime: [],
  formData: {
    infoReportTimeEnd: "",
    infoReportTimeStart: "",
    infoReportUnit: "",
    infoType: "",
  },
});

const handleChangeInfoReportTime = (value: any) => {
  debugger;
};

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  emit("onReset", state.formData);
  state.infoReportTime = [];
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
