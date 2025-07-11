<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="7">
              <a-form-item name="statisticalBeginHour" label="统计开始时间">
                <a-select
                  v-model:value="state.formData.statisticalBeginHour"
                  placeholder="请选择"
                  allow-clear
                >
                  <a-select-option
                    v-for="item in global.$getDictionary(
                      'railway_statistical_begin_hour'
                    )"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item name="statisticalDate" label="查询时间">
                <el-date-picker
                  type="datetimerange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="state.statisticalDate"
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

const props = defineProps({
  modelValue: {
    type: [Boolean, Object],
    default: false,
  },
  disabled: { type: Boolean, required: false, default: false },
});

const emit = defineEmits<{
  (e: "onSearch", formData: object): void;
  (e: "onReset", formData: object): void;
  (e: "update:modelValue", formData: object): void;
}>();


const formDataRef: any = ref(null);

const state = reactive({
  visible: false,
  formData: {
    statisticalBeginHour: null,
    statisticalDateBegin: null,
    statisticalDateEnd: null,
  },
  statisticalDate: [] as any[],
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
  state.formData.statisticalDateBegin = null;
  state.formData.statisticalDateEnd = null;
  state.statisticalDate = [];
  emit("onReset", state.formData);
};

const handleChangeTimeRange1 = (value: any) => {
  state.formData.statisticalDateBegin = !value
    ? ""
    : global.$dayjs(value[0]).format("YYYY-MM-DD HH:mm:ss");
  state.formData.statisticalDateEnd = !value
    ? ""
    : global.$dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss");
};

onMounted(async () => {
  state.statisticalDate = [
    global.$dayjs().startOf("day"),
    global.$dayjs().endOf("day"),
  ] as any[];
  handleChangeTimeRange1(state.statisticalDate);
  emit("update:modelValue", state.formData);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
