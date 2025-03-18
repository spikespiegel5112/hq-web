<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="7">
              <a-form-item name="calendarDate" label="日期">
                <a-date-picker
                  v-model:value="state.formData.calendarDate"
                  format="YYYY-MM-DD"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item name="dateType" label="日期类型">
                <a-select
                  v-model:value="state.formData.dateType"
                  placeholder="请选择"
                  allow-clear
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
            <a-col :span="5">
              <a-form-item name="exhibitionType" label="展会类型">
                <a-select
                  v-model:value="state.formData.exhibitionType"
                  placeholder="请选择"
                  allow-clear
                >
                  <a-select-option
                    v-for="item in global.$getDictionary('exhibitionType')"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item name="calendarDynamic" label="日历动态">
                <a-input
                  v-model:value="state.formData.calendarDynamic"
                  placeholder="请输入"
                >
                </a-input>
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
    calendarDate: null,
    dateType: null,
    exhibitionType: null,
    calendarDynamic: null,
  },
});

const eventAllList = computed(() => {
  return [
    ...global.$store.state.app.currentEventTypeList[0].data,
    ...global.$store.state.app.currentEventTypeList[1].data,
  ];
});

const handleSearch = () => {
  const formData: any = JSON.parse(JSON.stringify(state.formData));
  const calendarDate = formData.calendarDate
    ? global.$dayjs(formData.calendarDate).format("YYYY-MM-DD")
    : null;
  emit("onSearch", {
    ...formData,
    calendarDate,
  });
};

const handleReset = () => {
  formDataRef.value.resetFields();
  emit("onReset", state.formData);
};

// const handleChangecalendarDate = (value: any) => {
//   const calendarDateStart = global.$dayjs(value[0]).format("YYYY-MM-DD");
//   const calendarDateEnd = global.$dayjs(value[1]).format("YYYY-MM-DD");
//   state.calendarDateStart = calendarDateStart;
//   state.calendarDateEnd = calendarDateEnd;
// };

onMounted(async () => {
  emit("update:modelValue", state.formData);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
