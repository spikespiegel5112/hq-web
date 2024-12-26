<template>
  <div class="common_table_wrapper">
    <FilterTool @onSearch="handleSearch" @onReset="handleReset"></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <a-button class="import">导入</a-button>
                 <!-- <ExportButton
          :action="eventManageSuddenEventExportRequest"
          :queryFormData="queryFormData"
          :pagination="{
            ...pagination,
            pageSize: 9999999,
          }"
        /> -->
        <a-button class="add" @click="handleAdd">新增</a-button>
      </a-space>
    </div>
    <a-table
      :columns="transformPageModel()"
      :data-source="state.tableData"
      rowKey="id"
      :scroll="{
        y: 'calc(100vh - 5rem)',
      }"
      expandRowByClick
      :pagination="{
        current: pagination.page,
        total: pagination.total,
        pageSize: pagination.pageSize,
      }"
      @expand="handleExpand"
      @expandedRowsChange="handleExpandedRowsChange"
      @change="handleChangePage"
    >
      <template v-slot:expandIcon="props">
        <a-button type="link">
          <CaretRightOutlined
            :style="
              props.record.expand
                ? {
                    transform: 'rotateZ(90deg)',
                    transition: 'all 0.2s',
                    color: '#fff',
                  }
                : {
                    transform: 'rotateZ(0deg)',
                    transition: 'all 0.2s',
                    color: '#fff',
                  }
            "
          />
        </a-button>
      </template>
      <template
        #bodyCell="{ text, record, index, column }"
        :style="{
          width: '2rem',
        }"
      >
        <template v-if="column.key === 'operationColumn'">
          <span
            v-for="(action, index) in column.actions"
            :class="
                global.$store.state.dictionary.actionDictionary.find((item2:any) => item2.name === action).color
              "
          >
            <a-divider
              v-if="index > 0"
              type="vertical"
              style="margin: 0; height: 20px; background-color: #0096ff"
            />
            <a-button
              :key="action"
              type="link"
              @click.stop="handleAction(action, record)"
            >
              {{
                global.$store.state.dictionary.actionDictionary.find((item2:any) => item2.name === action).label
              }}
            </a-button>
          </span>
        </template>
      </template>
      <template #expandedRowRender="{ record, index, indent, expanded }">
        <PlanTable
          :planId="record.id"
          @onEdit="handleEditPlan($event, record)"
        />
      </template>
      <template #expandColumnTitle>
        <span></span>
      </template>
    </a-table>
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :preplanType="queryFormData.preplanType"
      :rowData="state.currentEventTypeData"
      :tableData="state.planTableData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    ></EditDialog>
  </div>
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
  toRaw,
} from "vue";

import {
  preplanPreplanGetPageRequest,
  preplanPreplanDeleteRequest,
  preplanPreplanSaveRequest,
  preplanPreplanGetStepPageRequest,
  eventManageSuddenEventExportRequest,
} from "@/api/management";

import { CaretRightOutlined } from "@ant-design/icons-vue";

import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import PlanTable from "./PlanTable.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSubmit", formData: any): void;
}>();

const pageModel = ref([
  // {
  //   label: "序号",
  //   name: "index",
  //   required: true,
  //   tableVisible: true,
  //   formVisible: true,
  //   exportVisible: false,
  // },
  {
    label: "事件类型",
    name: "eventType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "操作",
    name: "operationColumn",
    tableVisible: true,
    exportVisible: false,
    fixed: "right",
    width: "2rem",
    actions: ["edit", "delete"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  planTableData: [] as any[],
  dialogVisible: false,
  dialogMode: null as string | null,
  currentEventTypeData: {},
  tableDataPlan: [] as any[],
  rowData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const getData = () => {
  pagination.total = undefined;
  preplanPreplanGetPageRequest({
    ...queryFormData,
    ...pagination,
    preplanType: 0,
  })
    .then((response: any) => {
      response = response.data;
      state.tableData = response.list;
      pagination.total = response.total;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleEditPlan = (tableData: any, record: any) => {
  state.dialogVisible = true;
  state.dialogMode = "editPlan";
  state.planTableData = tableData;
  state.currentEventTypeData = record;
};

const handleEdit = (rowData: any) => {
  state.dialogVisible = true;
  state.dialogMode = "editPlanName";
  state.currentEventTypeData = rowData;
};

const handleAdd = () => {
  state.dialogVisible = true;
  state.dialogMode = "add";
};

const handleSearch = (formData: object) => {
  queryFormData = formData;
  getData();
};

const handleReset = (formData: object) => {
  queryFormData = formData;
  getData();
};

const handleClose = () => {
  state.dialogVisible = false;
  getData();
};

const handleSubmit = (formData: any) => {
  preplanPreplanSaveRequest(formData)
    .then((response: any) => {
      global.$message.success("提交成功");
      getData();
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("提交失败");
    });
};

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

const transformPageModel: any = () => {
  // title: 'Name', dataIndex: 'name', key: 'name', fixed: true
  const result = pageModel.value.map((item: any) => {
    return {
      ...item,
      title: item.label,
      dataIndex: item.name,
      key: item.name,
    };
  });
  return result;
};

const handleExpand = (expand: boolean, row: any) => {
  row.expand = expand;
};

const getDataPlan = (planId: number) => {
  pagination.total = undefined;
  preplanPreplanGetStepPageRequest({
    ...{
      prId: planId,
    },
    ...pagination,
    pageSize: 1000,
  })
    .then((response: any) => {
      response = response.data;
      state.tableDataPlan = response.list;
      pagination.total = response.total;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleExpandedRowsChange = (expandedRows: any) => {
  console.log(expandedRows);
};

const handleAction = (action: any, record: any) => {
  switch (action) {
    case "add":
      handleAdd();
      break;
    case "edit":
      handleEdit(record);
      break;
    case "review":
      state.dialogVisible = true;
      state.dialogMode = "review";
      state.currentEventTypeData = record;
      break;
    case "delete":
      global.$confirm({
        title: "提示",
        content: "确认删除？",
        onOk: () => {
          preplanPreplanDeleteRequest({
            id: record.id,
          })
            .then((response: any) => {
              getData();
              global.$message.success("删除成功");
            })
            .catch((error: any) => {
              console.log(error);
            });
        },
      });
      break;
  }
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.common_table_wrapper {
  border: 0;
  background-color: transparent;
  padding: 0.1rem 0;
}
</style>
