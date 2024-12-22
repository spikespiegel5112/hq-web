<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="20">
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item name="dataTime" label="信息上报时间">
                <a-range-picker
                  v-model:value="state.dataTime"
                  format="YYYY-MM-DD"
                  @change="handleChangeTime1"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item name="dataTime" label="信息上报时间">
                <a-range-picker
                  v-model:value="state.dataTime"
                  format="YYYY-MM-DD"
                  @change="handleChangeTime1"
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
  formData: {
    dataTimeEnd: "",
    dataTimeStart: "",
    warningType: "",
  },
  dataTime: [] as any[],
});

const handleChangeTime1 = (value: any) => {
  state.formData.dataTimeStart = global
    .$dayjs(value[0])
    .format("YYYY-MM-DD HH:mm:ss");

  state.formData.dataTimeEnd = global
    .$dayjs(value[1])
    .format("YYYY-MM-DD HH:mm:ss");
};

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  emit("onReset", state.formData);
  state.dataTime = [];
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
