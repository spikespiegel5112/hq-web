<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" ref="formDataRef" autocomplete="off">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item name="dicName" label="字典名称">
                <a-select
                  v-model:value="state.formData.dicName"
                  placeholder="请输入"
                  allowClear
                  show-search
                  :options="state.dictionaryNameList"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item name="code" label="字典编码">
                <a-input
                  v-model:value="state.formData.code"
                  placeholder="请输入"
                  allowClear
                ></a-input>
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
import type { DefaultOptionType } from "ant-design-vue/es/select";

const emit = defineEmits<{
  (e: "onSearch", formData: object): void;
  (e: "onReset", formData: object): void;
  (e: "update:modelValue", formData: object): void;
}>();

const props = defineProps({
  disabled: { type: Boolean, required: false, default: false },
  dictionaryNameList: {
    type: Array,
    required: false,
    default: () => {
      return [] as DefaultOptionType[];
    },
  },
});

const formDataRef: any = ref(null);

const state = reactive({
  formData: {
    dicName: null,
    code: null,
  },
  dictionaryNameList: [] as DefaultOptionType[],
});

watch(
  () => props.dictionaryNameList,
  (newValue: any, oldValue: any) => {
    importDictionary(newValue);
  }
);

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
};

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const handleFocus = () => {};
const handleBlur = () => {};
const handleChange = () => {};

const importDictionary = (dictionaryNameList: any[]) => {
  state.dictionaryNameList = dictionaryNameList.map((item: any) => {
    return {
      label: item.dicName,
      value: item.dicName,
    };
  });
};

onMounted(async () => {
  importDictionary(props.dictionaryNameList);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
