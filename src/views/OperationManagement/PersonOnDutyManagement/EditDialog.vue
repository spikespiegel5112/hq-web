<template>
  <a-modal
    v-model:open="props.visible"
    :title="props.mode === 'edit' ? '编辑' : '新增'"
    @cancel="handleClose"
    width="8rem"
  >
    <a-form :model="state.formData" autocomplete="off">
      <a-row>
        <a-space
          :size="20"
          :style="{
            width: '100%',
          }"
        >
          <a-form-item name="userName" label="报警类型">
            <a-input v-model="state.formData.userName" placeholder="请输入">
              <template #prefix>
                <span class="username"></span>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" label="报警内容">
            <a-input v-model="state.formData.password" placeholder="请输入">
              <template #prefix>
                <span class="password"></span>
              </template>
            </a-input>
          </a-form-item>
        </a-space>
      </a-row>
      <a-row>
        <a-space
          :size="20"
          :style="{
            width: '100%',
          }"
        >
          <a-form-item name="userName" label="报警类型">
            <a-input v-model="state.formData.userName" placeholder="请输入">
              <template #prefix>
                <span class="username"></span>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" label="报警内容">
            <a-input v-model="state.formData.password" placeholder="请输入">
              <template #prefix>
                <span class="password"></span>
              </template>
            </a-input>
          </a-form-item>
        </a-space>
      </a-row>
    </a-form>
  </a-modal>
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

import { screenBannerInfoRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const emit = defineEmits<{
  (e: "onClose", event: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  mode: { type: String, required: true, default: "" },
});

const state = reactive({
  formData: {
    userName: "",
    password: "",
  },
});



const handleClose = (event: any) => {
  emit("onClose", event);
};

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

<style scoped lang="scss">

</style>
