<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-item name="manageRegion" label="管理区域">
                <a-select
                  v-model:value="state.formData.manageRegion"
                  placeholder="请选择"
                  allow-clear
                >
                  <a-select-option
                    v-for="item in global.$store.state.dictionary.manageRegion"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="5">
              <a-form-item name="eventType" label="事件状态">
                <a-select
                  v-model:value="state.formData.eventType"
                  placeholder="请选择"
                  allow-clear
                >
                  <a-select-option
                    v-for="item in global.$getDictionary('disposalStatus')"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item name="eventLocation" label="地点">
                <a-input
                  v-model:value="state.formData.eventLocation"
                  placeholder="请输入"
                  allow-clear
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="7">
              <a-form-item name="eventTime" label="接收时间">
                <a-range-picker
                  v-model:value="state.eventTime"
                  format="YYYY-MM-DD"
                  @change="handleChangeEventTime"
                  allow-clear
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
}>();

const formDataRef: any = ref(null);

const state = reactive({
  formData: {
    eventTimeBegin: null,
    eventTimeEnd: null,
    eventType: null,
    eventLocation: null,
    manageRegion: null,
  } as any,
  eventTime: [] as any,
});

const eventList = computed(() => {
  return global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === 1
  )?.data;
});

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  const formData: any = Object.keys(state.formData).forEach((item: any) => {
    state.formData[item] = global.$isEmpty(state.formData[item])
      ? undefined
      : state.formData[item];
  });
  state.eventTime = [];
  emit("onReset", formData);
};

const handleChangeEventTime = (value: any) => {
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
