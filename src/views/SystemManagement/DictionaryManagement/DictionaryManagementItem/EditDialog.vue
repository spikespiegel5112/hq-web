<template>
  <a-modal
    v-model:open="state.visible"
    :title="dialogTitle"
    width="9rem"
    @cancel="handleClose"
  >
    <a-form
      ref="formDataRef"
      :model="state.formData"
      :rules="rules"
      autocomplete="off"
      :label-col="{
        style: { width: '150px' },
      }"
    >
      <a-row :gutter="20">
        <a-col :span="22">
          <a-form-item name="dicId" label="字典名称">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.dicId"
              placeholder="请输入"
              @change="hangleCHangeDictionaryNameList"
            >
              <a-select-option
                v-for="item in props.dictionaryNameList"
                :key="item.id"
                :value="item.id"
              >
                {{ item.dicName }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{ state.formData.dicId }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="22">
          <a-form-item name="label" label="字典项名称">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.label"
              placeholder="请输入"
            >
            </a-input>
            <template v-if="props.mode === 'review'">
              {{ state.formData.label }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="22">
          <a-form-item name="value" label="字典编码">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.value"
              placeholder="请输入"
            >
            </a-input>
            <template v-if="props.mode === 'review'">
              {{ state.formData.value }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="22">
          <a-form-item name="remark" label="字典项详细信息">
            <a-textarea
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.remark"
              placeholder="请输入"
            >
            </a-textarea>
            <template v-if="props.mode === 'review'">
              {{ state.formData.remark }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-row>
        <a-col :span="22">
          <template
            v-if="
              ['edit', 'add', 'disposal'].some((item) => item === props.mode)
            "
          >
            <a-button
              v-if="props.mode === 'edit'"
              key="submit"
              @click="handleDuplicate"
            >
              创建副本
            </a-button>
            <a-button key="back" @click="handleClose">取消</a-button>
            <a-button key="submit" type="primary" @click="handleSubmit">
              确认
            </a-button>
          </template>
          <template v-else-if="props.mode === 'review'">
            <a-button key="submit" type="primary" @click="handleClose">
              关闭
            </a-button>
          </template>
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
  (e: "onSubmit", formData: any, code: string): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  mode: { type: [String, null], required: true, default: null },
  dataModel: { type: Array, required: true, default: () => [] as any[] },
  rowData: { type: Object, required: true, default: () => {} },
  dictionaryNameList: {
    type: Array,
    required: false,
    default: () => [] as any[],
  },
});

const state: UnwrapRef<any> = reactive({
  visible: false,
  formData: {
    id: null as number | null | undefined,
    dicid: null as number | null | undefined,
    label: null,
    remark: null,
    value: null,
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
      emit("onSubmit", state.formData, state.currentDictionaryCode);
      handleClose();
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

const handleDuplicate = () => {
  state.formData.id = undefined;
  formDataRef.value
    .validate()
    .then(() => {
      emit("onSubmit", state.formData, state.currentDictionaryCode);
      handleClose();
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

const hangleCHangeDictionaryNameList = (value: any) => {
  const dictionaryItem: any = props.dictionaryNameList.find(
    (item: any) => item.id == value
  );
  state.currentDictionaryCode = dictionaryItem?.code;
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
