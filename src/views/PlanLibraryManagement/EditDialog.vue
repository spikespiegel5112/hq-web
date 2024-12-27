<template>
  <a-modal
    class="common_dailog_wrapper"
    v-model:open="state.visible"
    width="14rem"
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
      :label-col="{ style: { width: '120px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="eventType" label="事件类型">
            <a-input
              v-model:value="state.formData.preplanResource.eventType"
              placeholder="请输入"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <div v-if="['editPlan', 'add'].includes(props.mode)">
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
        <a-row v-if="['editPlan', 'add'].includes(props.mode)" justify="center">
          <a-col :span="22">
            <a-table
              :columns="columns"
              :data-source="state.formData.stepList"
              bordered
              :pagination="false"
            >
              <template #bodyCell="{ text, record, index, column }">
                <template v-if="column.dataIndex === 'index'">
                  {{ index + 1 }}
                </template>
                <template v-else>
                  <a-input
                    v-if="column.formType === 'input'"
                    v-model:value="
                      state.formData.stepList[index][column.dataIndex]
                    "
                  />
                  <a-textarea
                    v-if="column.formType === 'textarea'"
                    v-model:value="
                      state.formData.stepList[index][column.dataIndex]
                    "
                    :rows="3"
                  />
                </template>
              </template>
            </a-table>
          </a-col>
        </a-row>
      </div>
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

import { preplanPreplanSaveWithPreplanStepRequest  ,eventManageSuddenEventExportRequest
} from "@/api/management";

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    width: "80px",
    formType: "input",
  },
  {
    title: "处置步骤",
    dataIndex: "stepOrderDesc",
    width: "20%",
    formType: "input",
  },
  {
    title: "步骤名称",
    dataIndex: "stepName",
    formType: "input",
  },
  {
    title: "处置内容",
    dataIndex: "stepContent",
    width: "40%",
    formType: "textarea",
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
  mode: { type: [String, null], required: true, default: null },
  rowData: { type: Object, required: true, default: () => {} },
  tableData: { type: Object, required: true, default: () => [] },
  dataModel: { type: Array, required: true, default: () => [] },
  preplanType: { type: [Number, null], required: true, default: null },
});

let state = reactive({
  visible: false,
  formData: {
    preplanResource: {
      eventType: null,
      id: null as number | null | undefined,
      preplanType: null,
    },
    stepList: [
      {
        eventType: null,
        id: null as number | null | undefined,
        prId: null,
        preplanType: null,
        stepContent: null,
        stepName: null,
        stepOrder: null,
        stepOrderDesc: null,
      },
    ],
  } as any,
  fileList: [] as any[],
  tableData: [] as any[],
});

const dialogTitle: ComputedRef<string> = computed(() => {
  let result = "";
  if (props.mode === "add") {
    result = "新增";
  }
  if (["editPlan", "editPlanName"].includes(props.mode)) {
    result = "编辑";
  }
  return result;
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
      const rowData = JSON.parse(JSON.stringify(props.rowData));

      if (["editPlan", "editPlanName"].includes(props.mode)) {
        state.formData.preplanResource = {
          eventType: rowData.eventType,
          preplanType: rowData.preplanType,
          id: rowData.id,
        };
        state.formData.stepList = props.tableData;
      }

      if (props.mode === "add") {
        state.formData.preplanResource = {
          preplanType: props.preplanType,
        };
      }
    }
  }
);

const handleClose = () => {
  formDataRef.value.resetFields();
  emit("onClose");
  state.formData.stepList = [];
  state.formData.preplanResource.eventType = "";
};

const handleSubmit = () => {
  if (props.mode === "add") {
    state.formData.preplanResource.id = undefined;
    state.formData.stepList.forEach((item: any) => {
      item.id = undefined;
    });
  }

  preplanPreplanSaveWithPreplanStepRequest({
    ...state.formData,
  })
    .then((response: any) => {
      
      global.$message.success("提交成功");
      emit("onClose");
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("提交失败");
      emit("onClose");
    });
  console.log(state.formData);
  // emit("onSubmit", state.formData);
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

  state.formData.stepList.push({
    eventType: null,
    preplanType: null,
    stepContent: null,
    stepName: null,
    stepOrder: tableDataLength,
    stepOrderDesc: null,
  });
};
const handleMinus = (value: any) => {
  console.log(value);
  const currentStepListData = JSON.parse(
    JSON.stringify(state.formData.stepList)
  );
  if (currentStepListData.length > 1) {
    currentStepListData.shift();
    state.formData.stepList = currentStepListData;
  }
};

const handleChangeEventTime = (date: any) => {};

const handleChangeAttachment = () => {};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
