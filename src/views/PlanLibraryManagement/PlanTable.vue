<template>
  <div class="">
    <BaseTable
      :tableData="state.tableData"
      :dataModel="pageModel"
      height="100%"
      tableBodyHeight="calc(100% - 0.4rem)"
      @onEdit="handleEdit"
      @onReview="handleReview"
      @onDelete="handleDelete"
    />
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
import EditDialog from "./EditDialog.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  planId: { type: Number, required: true, default: null },
});

const pageModel = ref([
  {
    label: "处置步骤",
    name: "stepOrderDesc",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1rem",
  },
  {
    label: "步骤名称",
    name: "stepName",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "4rem",
  },
  {
    label: "处置内容",
    name: "stepContent",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    align: "left",
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

const state = reactive({
  tableData: [] as any[],
  dialogVisible: false,
  dialogMode: "",
  currentRowData: {},
  tableData: [] as any[],
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

watch(
  () => props.planId,
  (newValue: any, oldValue: any) => {
    if (global.$isNotEmpty(newValue)) {
      queryFormData.id = newValue;
      getData();
    }
  }
);

const getData = () => {
  pagination.total = undefined;
  preplanPreplanGetStepPageRequest({
    prId: props.planId,
    pageSize: 1000,
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
    getData(row.id);
  }
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
