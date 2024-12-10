<template>
  <a-modal
    v-model:open="props.visible"
    :title="dialogTitle"
    @cancel="handleClose"
    width="8rem"
  >
   <a-form       :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :label-col="{ style: { width: '80px' } }"
    >
      <a-row>
        <a-space
          :size="20"
          :style="{
            width: '100%',
          }"
        >
          <a-form-item name="userName" label="报警类型">
            <a-input v-model="state.formData.userName" placeholder="请输入">
         
            </a-input>
          </a-form-item>
          <a-form-item name="password" label="报警内容">
            <a-input v-model="state.formData.password" placeholder="请输入">
              
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
         
            </a-input>
          </a-form-item>
          <a-form-item name="password" label="报警内容">
            <a-input v-model="state.formData.password" placeholder="请输入">
              
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

const formDataRef = ref();

const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSubmit", formData: any): void;
}>();

const props = defineProps({   visible: { type: Boolean, required: true, default: false },   mode: { type: String, required: true, default: "" },   formData: { type: Object, required: true, default: () => {} }, });

const state = reactive({
  formData: {
    userName: "",
    password: "",
  },
});



const handleClose = (event: any) => {
  emit("onClose", event);
};



onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">

</style>
