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
            pageSize: 1000,
          }"
        /> -->
        <a-button class="add" @click="handleAdd">新增</a-button>
      </a-space>
    </div>
    <a-table
      :columns="columns"
      :data-source="state.tableData"
      :row-selection="rowSelection"
      :scroll="{
        y: tableBodyHeight,
      }"
    />
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


import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import routeDictionary from "@/router/routeDictionary";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
  children?: DataItem[];
}

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
    label: "菜单名称",
    name: "title",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "排序图标",
    name: "icon",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "权限标识",
    name: "bridgeCode",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "组件路径",
    name: "path",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "状态",
    name: "status",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "创建时间",
    name: "createTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "操作",     name: "operationColumn",     tableVisible: true,     exportVisible: false,     fixed: "right",
    actions: ["edit", "delete"],
  },
]);

const rowSelection = ref({
  checkStrictly: true,
  onChange: (
    selectedRowKeys: (string | number)[],
    selectedRows: DataItem[]
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (
    selected: boolean,
    selectedRows: DataItem[],
    changeRows: DataItem[]
  ) => {
    console.log(selected, selectedRows, changeRows);
  },
});

const columns = ref([] as any[]);

const state = reactive({
  tableData: [] as any[],
  dialogVisible: false,
  dialogMode: null as string | null,
  currentRowData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const tableBodyHeight = computed(() => {
  let result = "calc(100vh - 4rem)";
  return result;
}) as any;

const getData = () => {
  state.tableData = routeDictionary.find(
    (item: any) => item.name === "layout"
  ).children;
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

const handleSubmit = () => {};

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

const handleDelete = (id: number) => {};

const init = () => {
  columns.value = pageModel.value.map((item: any) => {
    return {
      ...item,
      title: item.label,
      dataIndex: item.name,
      key: item.name,
    };
  });
};

onMounted(async () => {
  init();
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.ant-table {
  .ant-table-container {
    .ant-table-body {
      height: calc(-4rem + 100vh);
    }
  }
}
</style>
