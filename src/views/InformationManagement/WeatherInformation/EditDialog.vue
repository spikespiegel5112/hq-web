<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="9rem">
    <template #title>
      <CommonTitle :title="dialogTitle" />
    </template>
    <a-row justify="center">
      <a-col :span="22">
        <div class="common_table_wrapper">
          <a-table
            class="common_basetable_wrapper"
            :dataSource="props.rowData.warningList"
            :columns="columns"
            :pagination="false"
          >
            <template #bodyCell="{ text, record, index, column }">
              <div
                v-if="column.dataIndex === 'index'"
                :style="{
                  textAlign: 'center',
                }"
              >
                {{ index + 1 }}
              </div>
              <div
                v-if="column.dataIndex === 'warningLevel'"
                :style="{
                  textAlign: 'center',
                }"
              >
                {{
              global
                .$getDictionary("planLevel")
                .find((item:any) => item.value === record.warningLevel)?.label
                }}
              </div>
            </template>
          </a-table>
        </div>
      </a-col>
    </a-row>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :label-col="{ style: { width: '150px' } }"
    >
      <a-row>
        <a-col :span="23">
          <a-form-item name="dataTime" label="日期">
            <template v-if="props.mode === 'detail'">
              {{ state.formData.dataTime }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="23">
          <a-form-item name="weatherSource" label="天气来源">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.weatherSource"
              placeholder="请选择"
              allow-clear
            >
              <a-select-option
                v-for="item in global.$getDictionary('planLevel')"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'detail'">
              {{ state.formData.weatherSource }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="23">
          <a-form-item name="temperature" label="温度（℃）">
            <template v-if="props.mode === 'detail'">
              {{ state.formData.temperature }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="23">
          <a-form-item name="weather" label="天气">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.weather"
              placeholder="请选择"
              allow-clear
            >
              <a-select-option
                v-for="item in global.$getDictionary('planLevel')"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'detail'">
              {{ state.formData.weather }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-row v-if="props.mode === 'edit'">
        <a-col :span="23">
          <a-button key="back" @click="handleClose">取消</a-button>
          <a-button key="submit" type="primary" @click="handleSubmit">
            确认
          </a-button>
        </a-col>
      </a-row>
      <a-row v-else>
        <a-col :span="24">
          <a-button key="back" @click="handleClose">关闭</a-button>
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
  rowData: { type: Object, required: true, default: () => {} },
  dataModel: { type: Array, required: true, default: () => [] },
});

const pageModel = ref([
  {
    label: "序号",
    name: "index",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: false,
  },
  {
    label: "预警类型",
    name: "warningType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "预警级别",
    name: "warningLevel",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  // {
  //   label: "预警内容",
  //   name: "warningContent",
  //   required: true,
  //   tableVisible: true,
  //   formVisible: true,
  //   exportVisible: true,
  //   width: "10",
  // },
  {
    label: "时间",
    name: "dataTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
]);

const state = reactive({
  visible: false,
  formData: {
    id: null as number | null | undefined,
    dataTime: null,
    temperature: null,
    warningContent: null,
    warningLevel: null,
    warningType: null,
    weather: null,
    weatherId: null,
    weatherSource: null,
    attachmentList: [] as any[],
  } as any,
  tableData: [] as any[],
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

const columns = computed(() => {
  return pageModel.value
    .filter((item) => item.tableVisible)
    .map((item) => {
      return {
        title: item.label,
        dataIndex: item.name,
        key: item.name,
      };
    });
});

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
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
    state.tableData = [];
    if (!!newValue) {
      await nextTick();
      if (["edit", "review", "detail", "disposal"].includes(props.mode)) {
        let rowData = JSON.parse(JSON.stringify(props.rowData));
        rowData = {
          ...rowData,
          dataTime: global.$dayjs(rowData.dataTime).format("YYYY/MM/DD"),
        };
        Object.keys(state.formData).forEach((item: string) => {
          state.formData[item] = rowData[item];
        });
        console.log(rowData);
        state.tableData = rowData.warningList;
      }
    }
  }
);

const handleClose = () => {
  emit("onClose");
  formDataRef.value.resetFields();
  state.formData.attachmentList = [];
};

const handleSubmit = () => {
  formDataRef.value
    .validate()
    .then(() => {
      if (props.mode === "add") {
        state.formData.id = undefined;
      }
      emit("onSubmit", {
        ...state.formData,
        dataTime: props.rowData.dataTime,
        temperature: props.rowData.temperature,
        weather: props.rowData.weather,
        weatherId: props.rowData.weatherId,
        weatherSource: props.rowData.weatherSource,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleChangeTime1 = () => {};

onMounted(() => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.common_table_wrapper {
  margin: 0.2rem 0;
  padding: 0;
  border: 0;
}
</style>
