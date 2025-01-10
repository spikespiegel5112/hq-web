<template>
  <a-modal
    v-model:open="state.visible"
    @cancel="handleClose"
    @ok="handleSubmit"
    width="12rem"
  >
    <template #title>
      <CommonTitle :title="dialogTitle" />
    </template>
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
        <a-col :span="11">
          <a-form-item name="username" label="用户名">
            <template v-if="props.mode === 'edit'">
              {{ state.formData.username }}
            </template>
            <a-input
              v-else
              v-model:value="state.formData.username"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item name="password" label="密码">
            <template v-if="props.mode === 'edit'">
              {{ state.formData.username }}
            </template>
            <a-input
              v-else
              v-model:value="state.formData.password"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="11">
          <a-form-item name="nickName" label="昵称">
            <a-input
              v-model:value="state.formData.nickName"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item name="phoneNumber" label="手机号码">
            <a-input
              v-model:value="state.formData.phoneNumber"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="11">
          <a-form-item name="userStatus" label="用户状态">
            <a-switch
              v-model:checked="state.formData.userStatus"
              :checkedValue="1"
              :unCheckedValue="0"
              checkedChildren="启用"
              unCheckedChildren="停用"
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
import type { Rule, RuleObject } from "ant-design-vue/es/form";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();
const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSubmit", formData: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  mode: { type: [String, null], required: true, default: null },
  rowData: { type: Object, required: true, default: null },
  dataModel: { type: Array, required: true, default: () => [] as any[] },
});

const state: UnwrapRef<any> = reactive({
  visible: false,
  formData: {
    id: null as number | null | undefined,
    loginTime: null,
    nickName: null,
    password: null,
    phoneNumber: null,
    userStatus: "0",
    username: null,
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
  Object.keys(state.formData).forEach((item) => {
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
        if (props.mode === "review") result[item] = false;
      }
      if (dataModelInfo.dataType === "number") {
        result[item].push({ validator: validateNumber, trigger: "change" });
      }
    }
  });
  return result;
});

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    if (!!newValue) {
      await nextTick();
      if (["edit", "review", "disposal"].some((item) => item === props.mode)) {
        const formData = JSON.parse(JSON.stringify(props.rowData));
        state.formData = formData;
      }
    } else {
      handleClose();
    }
  }
);

const handleClose = () => {
  formDataRef.value.resetFields();
  emit("onClose");
};

const handleSubmit = () => {
  if (props.mode === "add") {
    state.formData.id = undefined;
  }
  formDataRef.value
    .validate()
    .then(() => {
      emit("onSubmit", state.formData);
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
