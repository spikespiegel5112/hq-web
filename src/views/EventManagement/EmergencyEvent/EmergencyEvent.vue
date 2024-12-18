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
    <BaseTable
      :tableData="state.tableData"
      :dataModel="pageModel"
      :pagination="pagination"
      tabTable
      @onEdit="handleEdit"
      @onReview="handleReview"
      @onChangePage="handleChangePage"
      @onDelete="handleDelete"
      @onHandling="handleHandling"
    />
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    ></EditDialog>
    <HandlingDialog
      :visible="state.dialogHandlingVisible"
      :rowData="state.currentRowData"
      @onClose="handleCloseHandling"
      @onSubmit="handleSubmitHandling"
    ></HandlingDialog>
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
} from "vue";

import {
  eventManageSuddenEventGetPageRequest,
  eventManageSuddenEventDeleteRequest,
  eventManageSuddenEventSaveRequest,
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import HandlingDialog from "./HandlingDialog.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

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
    label: "事件发生地点",
    name: "eventLocation",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "2rem",
  },
  {
    label: "报警日期",
    name: "eventTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "2.5rem",
  },
  {
    label: "接收时间",
    name: "eventTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "2.5rem",
  },
  {
    label: "突发事件编码",
    name: "eventType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1.5rem",
  },
  {
    label: "事件类型",
    name: "eventType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1.2rem",
  },
  {
    label: "报警内容",
    name: "eventContent",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "3rem",
  },
  {
    label: "处置情况",
    name: "eventStatus",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1rem",
  },
  {
    label: "数据时间",
    name: "createTime",
    tableVisible: true,
    formVisible: false,
    exportVisible: false,
    width: "2.5rem",
  },
  {
    label: "操作",
    name: "operationColumn",
    tableVisible: true,
    exportVisible: false,
    fixed: "right",
    actions: ["edit", "review", "delete", "disposal"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  dialogVisible: false,
  dialogHandlingVisible: false,
  dialogMode: "",
  currentRowData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const getData = () => {
  pagination.total = undefined;
  eventManageSuddenEventGetPageRequest({
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

const handleReview = (rowData: any) => {
  state.dialogVisible = true;
  state.dialogMode = "review";
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
  eventManageSuddenEventSaveRequest(formData)
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

const handleDelete = (id: number) => {
  eventManageSuddenEventDeleteRequest({
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

const handleHandling = (rowData: any) => {
  state.dialogHandlingVisible = true;
  state.currentRowData = rowData;
};

const handleCloseHandling = () => {
  state.dialogHandlingVisible = false;
};

const handleSubmitHandling = () => {};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
