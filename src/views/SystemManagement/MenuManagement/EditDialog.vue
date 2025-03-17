<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="9rem">
    <template #title>
      <CommonTitle :title="props.title" />
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :rules
      :label-col="{ style: { width: '100px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="menuName" label="节点名称">
            <a-input
              v-model:value="state.formData.menuName"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="menuSort" label="序号">
            <a-input-number
              v-model:value="state.formData.menuSort"
              placeholder="请输入"
            >
            </a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="50">
        <a-col :span="11">
          <a-form-item name="menuType" label="节点类型">
            <a-select
              v-model:value="state.formData.menuType"
              placeholder="请选择"
            >
              <a-select-option :value="0">目录</a-select-option>
              <a-select-option :value="1">菜单</a-select-option>
              <a-select-option :value="2">按钮</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item name="menuStatus" label="节点状态">
            <a-switch
              v-model:checked="state.formData.menuStatus"
              :checkedValue="0"
              :unCheckedValue="1"
              checkedChildren="正常"
              unCheckedChildren="停用"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row> </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="permissionCode" label="权限编号">
            <a-input
              v-model:value="state.formData.permissionCode"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-row>
        <a-col :span="22">
          <a-button key="back" @click="handleClose">取消</a-button>
          <a-button key="submit" type="primary" @click="handleSubmit">
            确认
          </a-button>
        </a-col>
      </a-row>
    </template>
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
import type { Rule } from "ant-design-vue/es/form";

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
  rowData: { type: Object, required: true, default: () => {} },
  title: { type: String, required: true, default: "" },
  parentId: { type: [Number, null], required: true, default: null },
});

const state = reactive({
  visible: false,
  formData: {
    menuDesc: null,
    menuIcon: null,
    menuName: null,
    menuSort: null,
    menuStatus: 0,
    menuType: null,
    parentId: null,
    permissionCode: null,
  } as any,
});

const rules: Record<string, Rule[]> = {
  menuDesc: [
    {
      required: true,
      message: "请输入",
      trigger: "change",
    },
  ],
  menuIcon: [
    {
      required: true,
      message: "请输入",
      trigger: "change",
    },
  ],
  menuName: [
    {
      required: true,
      message: "请输入",
      trigger: "change",
    },
  ],
  menuSort: [
    {
      required: true,
      message: "请输入",
      trigger: "change",
    },
  ],
  menuStatus: [
    {
      required: true,
      message: "请输入",
      trigger: "change",
    },
  ],
  menuType: [
    {
      required: true,
      message: "请输入",
      trigger: "change",
    },
  ],
  permissionCode: [
    {
      required: true,
      message: "请输入",
      trigger: "change",
    },
  ],
};

const dialogTitle: ComputedRef<string> = computed(() => {
  return global.$store.state.dictionary.dialogMode.find(
    (item: any) => item.value === props.mode
  )?.title;
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
  state.formData.parentId = props.parentId;
  formDataRef.value
    .validate()
    .then(() => {
      emit("onSubmit", state.formData);
      handleClose();
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
