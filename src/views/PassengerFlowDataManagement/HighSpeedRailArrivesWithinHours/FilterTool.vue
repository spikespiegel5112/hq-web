<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="20">
          <a-row :gutter="20">
            <a-col :span="7">
              <a-form-item name="statisticalBeginHour" label="统计开始时间">
                <!-- railway_statistical_begin_hour -->
                <a-select
                  v-model:value="state.formData.statisticalBeginHour"
                  placeholder="请选择"
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
                <a-range-picker
                  show-time
                  v-model:value="state.statisticalDate"
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
    statisticalDateBegin: null,
    statisticalDateEnd: null,
  },
  statisticalDate: [],
});

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
