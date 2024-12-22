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
          <a-row justify="end">
            <a-col :span="3">
              <a-space>
                <a-button type="text" size="small" @click="handleAdd">
                  <template #icon>
                    <PlusCircleOutlined />
                  </template>
                </a-button>
                <a-button type="text" size="small" @click="handleMinus">
                  <template #icon>
                    <MinusCircleOutlined />
                  </template>
                </a-button>
              </a-space>
            </a-col>
          </a-row>
          <a-row justify="center">
            <a-col :span="22">
              <a-table
                :columns="columns"
                :data-source="editableData.formData"
                bordered
                :pagination="false"
              >
                <template #bodyCell="{ text, record, index, column }">
                  <template v-if="column.dataIndex === 'index'">
                    {{ index + 1 }}
                  </template>
                  <template v-else>
                    <a-input
                      v-model:value="
                        editableData.formData[index][column.dataIndex]
                      "
                    />
                  </template>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-row>
        <a-col :span="23">
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
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    width: "80px",
  },
  {
    title: "处置步骤",
    dataIndex: "stepOrderDesc",
    width: "20%",
  },
  {
    title: "步骤名称",
    dataIndex: "stepName",
  },
  {
    title: "处置内容",
    dataIndex: "stepContent",
    width: "40%",
  },
];

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
  tableData: { type: Object, required: true, default: () => [] },
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
  tableData: [] as any[],
});

const editableData = reactive({
  formData: [
    {
      eventType: "",
      preplanType: "",
      stepContent: "",
      stepName: "",
      stepOrder: null,
      stepOrderDesc: "",
    },
  ],
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
      if (["edit", "review"].some((item) => item === props.mode)) {
        const formData = JSON.parse(JSON.stringify(props.rowData));
        state.formData = {
          ...formData,
        };

        editableData.formData = props.tableData;
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
    editableData.formData.forEach((item: any) => {
      item.id = undefined;
    });
  }
  console.log(editableData);
  emit("onSubmit", editableData);
};

const save = (value: any) => {
  console.log(value);
};
const cancel = (value: any) => {
  console.log(value);
};
const edit = (value: any) => {
  console.log(value);
};

const handleAdd = (value: any) => {
  console.log(value);
  const tableDataLength = state.tableData.length;

  editableData.formData.push({
    eventType: "",
    preplanType: "",
    stepContent: "",
    stepName: "",
    stepOrder: tableDataLength,
    stepOrderDesc: "",
  });
};
const handleMinus = (value: any) => {
  console.log(value);
  if (editableData.formData.length > 1) {
    editableData.formData.shift();
  }
};

const handleChangeEventTime = (date: any) => {};

const handleChangeAttachment = () => {};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
