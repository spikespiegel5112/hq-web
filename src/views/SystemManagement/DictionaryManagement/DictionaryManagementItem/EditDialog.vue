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
        style: { width: '120px' },
      }"
    >
      <a-row :gutter="20">
        <a-col :span="24">
          <a-form-item name="dicName" label="字典名称">
            <a-select v-model:value="state.formData.dicId" placeholder="请输入">
              <a-select-option
                v-for="item in props.dictionaryNameList"
                :key="item.id"
                :value="item.id"
              >
                {{ item.dicName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="24">
          <a-form-item name="label" label="字典项名称">
            <a-input v-model:value="state.formData.label" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="24">
          <a-form-item name="value" label="字典编码">
            <a-input v-model:value="state.formData.value" placeholder="请输入">
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
  rowData: { type: Object, required: true, default: () => {} },
  dictionaryNameList: {
    type: Array,
    required: false,
    default: () => {
      return [] as any[];
    },
  },
});

const state: UnwrapRef<any> = reactive({
  formData: {
    id: null as number | null | undefined,
    dicId: null,
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

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    if (!!newValue) {
      await nextTick();
      if (["edit", "review"].some((item) => item === props.mode)) {
        state.formData = JSON.parse(JSON.stringify(props.rowData));
      }
    }
  }
);

const handleClose = (event: any) => {
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
      emit("onClose");
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
