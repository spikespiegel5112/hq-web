<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="20">
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

            <a-col :span="10">
              <a-form-item name="password" label="值班时间">
                <a-range-picker
                  v-model:value="state.formData.dutyTime"
                  format="YYYY-MM-DD"
                  @change="handleChangeDutyTime"
                  allow-clear
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
    staffName: null,
    dutyTime: [] as any[],
  },
  dutyStartTime: "",
  dutyEndTime: "",
});

const handleSearch = () => {
  const dutyStartTime = global
    .$dayjs(state.formData.dutyTime[0])
    .format("YYYY-MM-DD HH:mm:ss");
  const dutyEndTime = global
    .$dayjs(state.formData.dutyTime[1])
    .format("YYYY-MM-DD HH:mm:ss");
  const formData: any = JSON.parse(JSON.stringify(state.formData));
  formData.dutyTime = undefined;
  emit("onSearch", {
    ...formData,
    dutyStartTime,
    dutyEndTime,
  });
};

const handleReset = () => {
  formDataRef.value.resetFields();
  emit("onReset", state.formData);
  state.formData.dutyTime = [];
};

const handleChangeDutyTime = (value: any) => {
  const dutyStartTime = global.$dayjs(value[0]).format("YYYY-MM-DD");
  const dutyEndTime = global.$dayjs(value[1]).format("YYYY-MM-DD");
  state.dutyStartTime = dutyStartTime;
  state.dutyEndTime = dutyEndTime;
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
