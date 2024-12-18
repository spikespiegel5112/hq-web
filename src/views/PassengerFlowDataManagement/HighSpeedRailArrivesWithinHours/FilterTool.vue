<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="20">
          <a-row :gutter="20">
            <a-col :span="5">
              <a-form-item name="statisticalBeginHour" label="时段">
                <a-time-picker
                  v-model:value="state.formData.statisticalBeginHour"
                  format="HH:mm:ss"
                  valueFormat="HH"
                  :minute-step="60"
                  :second-step="60"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item name="statisticalDate" label="查询时间">
                <a-range-picker
                  v-model:value="state.statisticalDate"
                  format="YYYY-MM-DD"
                  @change="handleChangeStatisticalDate"
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
  visible: false,
  formData: {
    statisticalBeginHour: null,
    statisticalDateBegin: "",
    statisticalDateEnd: "",
  },
  statisticalDate: [],
});

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  state.formData.statisticalDateBegin = "";
  state.formData.statisticalDateEnd = "";
  state.statisticalDate = [];
  emit("onReset", state.formData);
};

const handleChangeStatisticalDate = (data: any) => {
  state.formData.statisticalDateBegin = global
    .$dayjs(data[0])
    .format("YYYY-MM-DD");
  state.formData.statisticalDateEnd = global
    .$dayjs(data[1])
    .format("YYYY-MM-DD");
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
