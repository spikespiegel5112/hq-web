<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="6">
              <a-form-item name="name" label="角色名称">
                <a-input v-model:value="formData.name" placeholder="请输入">
                </a-input>
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

const formData = reactive({
  name: null,
});

const handleSearch = () => {
  emit("onSearch", formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  emit("onReset", formData);
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
