<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="9rem">
    <template #title>
           <CommonTitle :title="dialogTitle" />

    </template>
    <a-form
      :model="state.formData"
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
            <a-input
              v-model:value="state.formData.userName"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
          <a-form-item name="password" label="报警内容">
            <a-input
              v-model:value="state.formData.password"
              placeholder="请输入"
            >
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
            <a-input
              v-model:value="state.formData.userName"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
          <a-form-item name="password" label="报警内容">
            <a-input
              v-model:value="state.formData.password"
              placeholder="请输入"
            >
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
});

const state = reactive({
  visible: false,
  formData: {
    userName: null,
    password: null,
  },
});

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
