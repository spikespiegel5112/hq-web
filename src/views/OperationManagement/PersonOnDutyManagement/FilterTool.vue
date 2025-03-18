<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-item name="staffName" label="人员姓名">
                <a-input
                  v-model:value="state.formData.staffName"
                  placeholder="请输入"
                  allow-clear
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item name="hocStaffName" label="HOC值班人员姓名">
                <a-input
                  v-model:value="state.formData.hocStaffName"
                  placeholder="请输入"
                  allow-clear
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item name="password" label="值班时间">
                <el-date-picker
                  type="datetimerange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="state.dutyTime"
                  @change="handleChangeTimeRange1"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="3" class="operation">
          <a-space>
            <a-button class="submitbutton" @click="handleReset">
              重置
            </a-button>
            <a-button
              class="submitbutton"
              type="primary"
              @click="handleSearch"
              :disabled="props.disabled"
            >
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
  (e: "update:modelValue", formData: object): void;
}>();

const props = defineProps({
  disabled: { type: Boolean, required: false, default: false },
});

const formDataRef: any = ref(null);

const state = reactive({
  formData: {
    dutyStartTime: null,
    dutyEndTime: null,
    staffName: null,
    hocStaffName: null,
  },
  dutyTime: [] as any[],
});

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  state.formData = {
    ...state.formData,
    dutyStartTime: null,
    dutyEndTime: null,
  };
  state.dutyTime = [];
  emit("onReset", state.formData);
};

const handleChangeTimeRange1 = (value: any) => {
  state.formData.dutyStartTime = !value
    ? ""
    : global.$dayjs(value[0]).format("YYYY-MM-DD HH:mm:ss");
  state.formData.dutyEndTime = !value
    ? ""
    : global.$dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss");
};

onMounted(async () => {
  emit("update:modelValue", state.formData);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
