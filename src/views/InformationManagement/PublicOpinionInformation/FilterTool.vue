<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="5">
              <a-form-item name="publicSentimentType" label="舆情类型">
                <a-select
                  v-model:value="state.formData.publicSentimentType"
                  placeholder="请输入"
                >
                  <a-select-option
                    v-for="item in global.$store.state.dictionary[
                      'complaintType'
                    ]"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="5">
              <a-form-item name="publicSentimentSource" label="舆情来源">
                <a-select
                  v-model:value="state.formData.publicSentimentSource"
                  placeholder="请输入"
                >
                  <a-select-option
                    v-for="item in global.$store.state.dictionary[
                      'complaintType'
                    ]"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="4">
              <a-form-item name="keyword" label="关键词">
                <a-input
                  v-model:value="state.formData.keyword"
                  placeholder="请输入"
                  allow-clear
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item name="publicSentimentTime" label="舆情发生时间">
                <a-range-picker
                  show-time
                  v-model:value="state.publicSentimentTime"
                  format="YYYY-MM-DD HH:mm:ss"
                  allow-clear
                  @change="handleChangeTime1"
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
    keyword: null,
    publicSentimentSource: null,
    publicSentimentTimeEnd: null,
    publicSentimentTimeStart: null,
    publicSentimentType: null,
  },
  publicSentimentTime: [] as any[],
  dateRange: [],
});

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  state.publicSentimentTime = [];
  state.formData.publicSentimentTimeEnd = null;
  state.formData.publicSentimentTimeStart = null;
  emit("onReset", state.formData);
};

const handleChangeTime1 = (value: any) => {
  state.formData.publicSentimentTimeStart = global
    .$dayjs(value[0])
    .format("YYYY-MM-DD HH:mm:ss");
  state.formData.publicSentimentTimeEnd = global
    .$dayjs(value[1])
    .format("YYYY-MM-DD HH:mm:ss");
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
