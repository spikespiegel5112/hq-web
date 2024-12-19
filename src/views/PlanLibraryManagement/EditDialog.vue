<template>
  <a-modal
    class="common_dailog_wrapper"
    v-model:open="state.visible"
    width="10rem"
    @cancel="handleClose"
  >
    <template #title>
      <div class="common_dislogtitle_item">
        <span class="sequre"></span>
        <span class="text"> {{ dialogTitle }}</span>
      </div>
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :disabled="props.mode === 'review'"
      :rules="rules"
      :label-col="{ style: { width: '120px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventType" label="事件类型">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.eventType"
              placeholder="请输入"
            >
            </a-input>
            <div v-if="props.mode === 'review'">
              {{ state.formData.eventType }}
            </div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-table :columns="columns" :data-source="[]" bordered>
            <template #bodyCell="{ column, text, record }">
              <template
                v-if="['name', 'age', 'address'].includes(column.dataIndex)"
              >
                <div>
                  <a-input
                    v-model:value="editableData[record.key][column.dataIndex]"
                    style="margin: -5px 0"
                  />
                  <template>
                    {{ text }}
                  </template>
                </div>
              </template>
              <template v-else-if="column.dataIndex === 'operation'">
                <div class="editable-row-operations">
                  <span v-if="editableData[record.key]">
                    <a-typography-link @click="save(record.key)"
                      >Save</a-typography-link
                    >
                    <a-popconfirm
                      title="Sure to cancel?"
                      @confirm="cancel(record.key)"
                    >
                      <a>Cancel</a>
                    </a-popconfirm>
                  </span>
                  <span v-else>
                    <a @click="edit(record.key)">Edit</a>
                  </span>
                </div>
              </template>
            </template>
          </a-table>
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
  onUnmounted,
} from "vue";

import type { Rule, RuleObject } from "ant-design-vue/es/form";
import type { UnwrapRef } from "vue";

const columns = [
  {
    title: "name",
    dataIndex: "name",
    width: "25%",
  },
  {
    title: "age",
    dataIndex: "age",
    width: "15%",
  },
  {
    title: "address",
    dataIndex: "address",
    width: "40%",
  },
  {
    title: "operation",
    dataIndex: "operation",
  },
];

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}
const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();
const fileList = ref([]);

const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSubmit", formData: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  mode: { type: String, required: true, default: "" },
  rowData: { type: Object, required: true, default: () => {} },
  dataModel: { type: Array, required: true, default: () => [] },
});

let state = reactive({
  visible: false,
  formData: {
    eventType: "",
    id: null as number | null | undefined,
    preplanType: "",
  } as any,
  fileList: [] as any,
});

const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

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
        state.formData = {
          ...formData,
          eventTime: global.$dayjs(formData.eventTime),
        };
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
      emit("onSubmit", {
        ...state.formData,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

const handleChangeEventTime = (date: any) => {};

const handleChangeAttachment = () => {};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
