<template>
  <a-modal
    v-model:open="props.visible"
    :title="props.mode === 'edit' ? '编辑' : '新增'"
    @cancel="handleClose"
    @ok="handleSubmit"
    width="8rem"
  >
    <a-form
      ref="formRef"
      :model="formDataState"
      :rules="rules"
      autocomplete="off"
      :label-col="{
        style: { width: '100px' },
      }"
    >
      <a-row :gutter="20">
        <a-col :span="12">
          <a-form-item name="dicName" label="字典项名称">
            <a-input v-model:value="formDataState.dicName" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="label" label="字典标签">
            <a-input v-model:value="formDataState.label" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="12">
          <a-form-item name="value" label="字典值">
            <a-input v-model:value="formDataState.value" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="24">
          <a-form-item name="remark" label="字典详细信息">
            <a-textarea
              v-model:value="formDataState.remark"
              placeholder="请输入"
              :rows="4"
            />
          </a-form-item>
        </a-col>
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
  toRaw,
  nextTick,
} from "vue";
import type { UnwrapRef } from "vue";
import type { Rule } from "ant-design-vue/es/form";

import { dictionaryManageSaveDictRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formRef = ref();
const emit = defineEmits<{
  (e: "onClose", event: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  mode: { type: String, required: true, default: "" },
});

const formDataState: UnwrapRef<any> = reactive({
  code: "",
  dicName: "",
  id: null as number | null | undefined,
  label: "",
  remark: "",
  value: "",
});

const rules: Record<string, Rule[]> = {};

const handleClose = (event: any) => {
  emit("onClose", event);
};

const handleSubmit = () => {
  if (props.mode === "add") {
    // : UnwrapRef<FormState> .id = undefined;
  }
  const aaa = toRaw(formDataState);
  console.log(aaa);
  // debugger;
  // dictionaryManageSaveDictRequest(: UnwrapRef<FormState> )
  //   .then((response: any) => {
  //     global.$message("adsadas");
  //   })
  //   .catch((error: any) => {
  //     console.log(error);
  //   });
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
