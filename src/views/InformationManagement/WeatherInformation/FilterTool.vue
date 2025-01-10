<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item name="dataTime" label="时间">
                <el-date-picker
                  type="datetimerange"
                  v-model="state.dataTime"
                  @change="handleChangeTime1"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item name="warningType" label="预警类型">
                <a-select
                  v-model:value="state.formData.warningType"
                  placeholder="请选择"
                  allow-clear
                >
                  <a-select-option
                    v-for="item in global.$getDictionary(
                      'weather_warning_warning_type_enum'
                    )"
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
    dataTimeEnd: null,
    dataTimeBegin: null,
    warningType: null,
  },
  dataTime: [] as any[],
});

const handleChangeTime1 = (value: any) => {
  state.formData.dataTimeBegin = global
    .$dayjs(value[0])
    .format("YYYY-MM-DD HH:mm:ss");

  state.formData.dataTimeEnd = global
    .$dayjs(value[1])
    .format("YYYY-MM-DD HH:mm:ss");
};

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
  emit("onReset", {});
  state.dataTime = [];
};

onMounted(async () => {
  emit("update:modelValue", state.formData);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
