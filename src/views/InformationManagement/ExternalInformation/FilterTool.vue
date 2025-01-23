<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-item name="externalSource" label="外部信息来源">
                <a-select
                  v-model:value="state.formData.externalSource"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in global.$getDictionary(
                      'external_info_external_source'
                    )"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item name="externalType" label="信息类型">
                <a-select
                  v-model:value="state.formData.externalType"
                  placeholder="请选择"
                  allow-clear
                >
                  <a-select-option
                    v-for="item in global.$getDictionary(
                      'external_info_external_type'
                    )"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="10">
              <a-form-item name="externalTime" label="信息上报时间">
                <el-date-picker
                  type="datetimerange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="state.externalTime"
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
    externalSource: null,
    externalTimeEnd: null,
    externalTimeStart: null,
    externalType: null,
  },
  externalTime: [] as any[],
});

const handleChangeTimeRange1 = (value: any) => {
  if (!value) return;
  state.formData.externalTimeStart  = !value
    ? ""
    : global.$dayjs(value[0])
    .format("YYYY-MM-DD HH:mm:ss");

  state.formData.externalTimeEnd =!value
    ? ""
    : global.$dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss");
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
  emit("onReset", state.formData);
  state.externalTime = [];
};

onMounted(async () => {
  emit("update:modelValue", state.formData);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
