<template>
  <a-modal
    v-model:open="props.visible"
    :title="dialogTitle"
    @cancel="handleClose"
    @ok="handleSubmit"
    width="8rem"
  >
    <a-form
      ref="formDataRef"
      :model="state.formData"
      :rules="rules"
      autocomplete="off"
      :label-col="{
        style: { width: '100px' },
      }"
    >
      <a-row :gutter="20">
        <a-col :span="12">
          <a-form-item name="dicName" label="字典名称">
            <a-input
              v-model:value="state.formData.dicName"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="code" label="字典编码">
            <a-input v-model:value="state.formData.code" placeholder="请输入">
            </a-input>
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
import type { Rule, RuleObject } from "ant-design-vue/es/form";

import { dictionaryManageSaveDictRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();
const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSubmit", formData: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  mode: { type: String, required: true, default: "" },
  dataModel: { type: Array, required: true, default: () => [] as any[] },
});

const state: UnwrapRef<any> = reactive({
  formData: {
    id: null as number | null | undefined,
    code: "",
    dicName: "",
    label: "",
    remark: "",
    value: "",
  },
});

const dialogTitle: ComputedRef<string> = computed(() => {
  return global.$store.state.dictionary.dialogMode.find(
    (item: any) => item.value === props.mode
  )?.title;
});

const rules: ComputedRef<RuleObject[]> = computed(() => {
  const validateNumber = (rule: any, value: any, callback: any) => {
    if (isNaN(Number(value))) {
      callback(new Error("请输入数字值"));
    } else {
      callback();
    }
  };

  const result: any = {};
  Object.keys(toRaw(state.formData)).forEach((item) => {
    const dataModelInfo = props.dataModel.find(
      (item2: any) => item2.name === item
    ) as any;
    if (!!dataModelInfo) {
      result[item] = [];
      if (dataModelInfo.required) {
        result[item].push({
          required: true,
          message: "请输入" + dataModelInfo.label,
          trigger: "change",
        });
      }
      if (dataModelInfo.dataType === "number") {
        result[item].push({ validator: validateNumber, trigger: "change" });
      }
    }
  });
  return result;
});

const handleClose = (event: any) => {
  emit("onClose");
};

const handleSubmit = () => {
  if (props.mode === "add") {
    state.formData.id = undefined;
  }
  console.log(state.formData);
  formDataRef.value
    .validate()
    .then(() => {
      dictionaryManageSaveDictRequest(state.formData)
        .then((response: any) => {
          global.$message.success("提交成功");
        })
        .catch((error: any) => {
          console.log(error);
          global.$message.error("提交失败");
        });
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
