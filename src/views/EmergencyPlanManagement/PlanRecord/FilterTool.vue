<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-item name="preplanResourceId" label="预案类型">
                <a-select
                  v-model:value="state.formData.preplanResourceId"
                  placeholder="请选择"
                  allow-clear
                >
                  <a-select-option
                    v-for="item in eventList"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="10">
              <a-form-item name="planTime" label="查询时间">
                <el-date-picker
                  type="datetimerange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="state.planTime"
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
  (e: "update:modelValue", formData: object): void;
}>();

const formDataRef: any = ref(null);

const state = reactive({
  formData: {
    preplanResourceId: null,
    planTimeStart: null,
    planTimeEnd: null,
  } as any,
  planTime: [] as any,
});

const eventList = computed(() => {
  let result = global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === global.$store.state.app.emergencyPlanType
  )?.data;
  result = result.map((item: any) => {
    return {
      ...item,
      value: Number(item.value),
    };
  });
  return result;
});

watch(
  () => state.formData,
  (newValue: any, oldValue: any) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  state.formData.planTimeStart = "";
  state.formData.planTimeEnd = "";
  state.planTime = [];
  emit("onReset", state.formData);
};

const handleChangeTimeRange1 = (value: any) => {
  state.formData.planTimeStart  = !value
    ? ""
    : global.$dayjs(value[0])
    .format("YYYY-MM-DD HH:mm:ss");
  state.formData.planTimeEnd =!value
    ? ""
    : global.$dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss");
};

onMounted(async () => {
  emit("update:modelValue", state.formData);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
