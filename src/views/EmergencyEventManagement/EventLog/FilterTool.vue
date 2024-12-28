<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="20">
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-item name="manageRegion" label="管理区域">
                <a-select
                  v-model:value="state.formData.manageRegion"
                  placeholder="请输入"
                >
                  <a-select-option
                    v-for="item in global.$store.state.dictionary[
                      'manageRegion'
                    ]"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item name="eventType" label="事件类型">
                <a-select
                  v-model:value="state.formData.eventType"
                  placeholder="请选择"
                  allow-clear
                >
                  <a-select-option
                    v-for="item in eventList"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item name="eventTime" label="时间">
                <a-range-picker
                  show-time
                  v-model:value="state.eventTime"
                  format="YYYY-MM-DD HH:mm:ss"
                  allow-clear
                  @change="handleChangeInfoEventTime"
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
    eventTimeBegin: null,
    eventTimeEnd: null,
    eventType: null,
    manageRegion: null,
  } as any,
  eventTime: null,
});

const eventList = computed(() => {
  return global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === global.$store.state.app.emergencyEventType
  )?.data;
});

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  state.formData = {
    ...state.formData,
    eventTimeBegin: null,
    eventTimeEnd: null,
  };
  state.eventTime = [];
  emit("onReset", state.formData);
};

const handleChangeInfoEventTime = (value: any[]) => {
  state.formData.eventTimeBegin = global
    .$dayjs(value[0])
    .format("YYYY-MM-DD HH:mm:ss");

  state.formData.eventTimeEnd = global
    .$dayjs(value[1])
    .format("YYYY-MM-DD HH:mm:ss");
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
