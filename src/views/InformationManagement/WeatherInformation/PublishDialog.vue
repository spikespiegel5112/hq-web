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
      :rules="rules"
      :label-col="{ style: { width: '80px' } }"
    >
      <a-row>
        <a-col :span="23">
          <a-form-item name="warningType" label="类型">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.warningType"
              placeholder="请选择"
              allow-clear
            >
              <a-select-option
                v-for="item in global.$getDictionary(
                  'weather_warning_warning_type_enum'
                )"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{ state.formData.warningType }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="23">
          <a-form-item name="warningLevel" label="级别">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.warningLevel"
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
            <template v-if="props.mode === 'review'">
              {{ 
                global.$getDictionary("planLevel").find((item2: any) => item2.value === state.formData.warningLevel)?.label
              }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="23">
          <a-form-item name="warningContent" label="内容">
            <a-textarea
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.warningContent"
              placeholder="请输入"
              :rows="5"
              allow-clear
            >
            </a-textarea>
            <template v-if="props.mode === 'review'">
              {{ state.formData.warningContent }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="23">
          <a-form-item name="attachmentList" label="附件">
            <CommonUpload :attachmentList="state.formData.attachmentList" />
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
  return {
    warningType: {
      required: true,
      message: "请输入",
      trigger: "change",
    },
    warningLevel: {
      required: true,
      message: "请输入",
      trigger: "change",
    },
    warningContent: {
      required: true,
      message: "请输入",
      trigger: "change",
    },
    attachmentList: {
      required: false,
      message: "请上传",
      trigger: "change",
    },
  };
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
      if (["edit", "review", "disposal"].some((item) => item === props.mode)) {
        let rowData = JSON.parse(JSON.stringify(props.rowData));
        rowData = {
          ...rowData,
          dataTime: global.$dayjs(rowData.dataTime, "YYYY-MM-DD HH:mm:ss"),
        };
        console.log(rowData);
        state.tableData = rowData.warningList;
      }
    }
  }
);

const handleClose = () => {
  formDataRef.value.resetFields();
  state.formData.attachmentList = [];
  emit("onClose");
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
