<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-item name="preplanResourceId" label="预警类型">
                <a-select
                  v-model:value="state.formData.preplanResourceId"
                  placeholder="请选择"
                  allow-clear
                >
                  <a-select-option
                    v-for="item in eventAllList"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="9">
              <a-form-item name="alarmTime" label="日期">
                <el-date-picker
                  type="datetimerange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="state.alarmTime"
                  @change="handleChangeTime1"
                />
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item name="dateType" label="日期类型">
                <a-select
                  v-model:value="state.formData.dateType"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in global.$getDictionary('dateType')"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item name="alarmLevel" label="级别">
                <a-select
                  v-model:value="state.formData.alarmLevel"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in global.$getDictionary('alarmLevel')"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
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
    alarmLevel: null,
    dateType: null,
    alarmTimeEnd: null,
    alarmTimeStart: null,
    preplanResourceId: null,
    // preplanResourceId: "106",
  },
  alarmTime: [],
});

const eventAllList = computed(() => {
  return [
    ...global.$store.state.app.currentEventTypeList[0].data,
    ...global.$store.state.app.currentEventTypeList[1].data,
  ];
});

const handleSearch = () => {
  const formData: any = JSON.parse(JSON.stringify(state.formData));
  emit("onSearch", {
    ...formData,
  });
};

const handleReset = () => {
  formDataRef.value.resetFields();
  state.alarmTime = [];
  state.formData.alarmTimeStart = null;
  state.formData.alarmTimeEnd = null;
  emit("onReset", state.formData);
};

const handleChangeTime1 = (value: any) => {
  const alarmTimeStart = global.$dayjs(value[0]).format("YYYY-MM-DD HH:mm:ss");
  const alarmTimeEnd = global.$dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss");
  state.formData.alarmTimeStart = alarmTimeStart;
  state.formData.alarmTimeEnd = alarmTimeEnd;
};

onMounted(async () => {
  emit("update:modelValue", state.formData);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
