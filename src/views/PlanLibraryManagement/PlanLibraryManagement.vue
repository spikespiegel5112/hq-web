<template>
  <div class="common_table_wrapper">
    <FilterTool @onSearch="handleSearch" @onReset="handleReset"></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <a-button class="import">导入</a-button>
        <a-button class="export">导出</a-button>
        <a-button class="add" @click="handleAdd">新增</a-button>
      </a-space>
    </div>
    <a-table
      :columns="transformPageModel()"
      :data-source="state.tableData"
      rowKey="id"
      :scroll="{
        y: 'calc(100vh - 4.3rem)',
      }"
      expandRowByClick
      @expand="handleExpand"
      @expandedRowsChange="handleExpandedRowsChange"
    >
      <template
        #bodyCell="{ column }"
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
              @click.stop="handleAction(action, column)"
            >
              {{
                global.$store.state.dictionary.actionDictionary.find((item2:any) => item2.name === action).label
              }}
            </a-button>
          </span>
        </template>
      </template>
      <template #expandedRowRender="{ record, index, indent, expanded }">
        <BaseTable
          :tableData="state.tableDataPlan"
          :dataModel="pageModelPlan"
          height="100%"
          tableBodyHeight="calc(100% - 0.4rem)"
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
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    ></EditDialog>
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
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
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

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
    width: "2.8rem",
    actions: ["edit", "review", "delete"],
  },
]);

const pageModelPlan = ref([
  {
    label: "处置步骤",
    name: "eventType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "步骤名称",
    name: "eventType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "处置内容",
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
    actions: ["edit", "review", "delete"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  planTableData: [] as any[],
  dialogVisible: false,
  dialogMode: "",
  currentRowData: {},
  tableDataPlan: [] as any[],
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

const handleEdit = (rowData: any) => {
  state.dialogVisible = true;
  state.dialogMode = "edit";
  state.currentRowData = rowData;
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

const handleDelete = (id: number) => {
  preplanPreplanDeleteRequest({
    id,
  })
    .then((response: any) => {
      global.$message.success("删除成功");
      getData();
    })
    .catch((error: any) => {
      global.$message.error("删除失败");
      console.log(error);
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
  console.log(row);
  if (!!expand) {
    getDataPlan(row.id);
  }
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

const handleAction = (action: any, column: any) => {};

onMounted(async () => {
  transformPageModel();
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
