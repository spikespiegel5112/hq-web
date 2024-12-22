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
      :processedTableData="state.processedTableData"
      :dataModel="pageModel"
      :pagination="pagination"
      tabTable
      @onEdit="handleEdit"
      @onReview="handleReview"
      @onChangePage="handleChangePage"
      @onDelete="handleDelete"
      @onDisposal="handleDisposal"
    />
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    ></EditDialog>
    <ReviewDialog
      :visible="state.dialogReviewVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    >
    </ReviewDialog>
    <DisposalDialog
      :visible="state.dialogDisposalVisible"
      :rowData="state.currentRowData"
      :dataModel="pageModel"
      mode="disposal"
      @onClose="handleCloseHandling"
      @onSubmit="handleSubmitDisposal"
    ></DisposalDialog>
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
  planManagementEmergencyPlanGetPageRequest,
  planManagementEmergencyPlanDeleteRequest,
  planManagementEmergencyPlanSaveRequest,
  planManagementEmergencyPlanSaveDisposalRequest,
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import DisposalDialog from "./DisposalDialog.vue";
import ReviewDialog from "./ReviewDialog.vue";

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
    label: "来源",
    name: "planSource",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1rem",
  },
  {
    label: "预案类型",
    name: "preplanResourceId",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "预案内容",
    name: "planContent",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1.5rem",
  },
  {
    label: "预案等级",
    name: "planLevel",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "发生时间",
    name: "planTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "状态",
    name: "planStatus",
    required: true,
    tableVisible: true,
    formVisible: false,
    exportVisible: false,
    tagConfig: {
      val: "label",
      dictionary: global.$store.state.dictionary.eventStatus,
      colorList: [
        { value: "未处理", color: "error" },
        { value: "处理中", color: "warning" },
        { value: "已处置", color: "success" },
      ],
    },
    width: "1rem",
  },
  {
    label: "附件",
    name: "attachment",
    required: false,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1.5rem",
  },
  {
    label: "操作",
    name: "operationColumn",
    tableVisible: true,
    exportVisible: false,
    fixed: "right",
    actions: ["edit", "review", "delete", "eventDisposal"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  processedTableData: [] as any[],
  dialogVisible: false,
  dialogDisposalVisible: false,
  dialogReviewVisible: false,
  dialogMode: "",
  currentRowData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const getData = () => {
  pagination.total = undefined;
  planManagementEmergencyPlanGetPageRequest({
    ...queryFormData,
    ...pagination,
  })
    .then((response: any) => {
      response = response.data;
      state.tableData = response.list;
      pagination.total = response.total;
      state.processedTableData = response.list.map((item: any) => {
        return {
          ...item,
          planStatus: global
            .$getDictionary("planStatus")
            .find((item2: any) => item2.value === item.planStatus).label,
          planLevel: global
            .$getDictionary("planLevel")
            .find((item2: any) => item2.value === item.planLevel).label,
        };
      });
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
  state.dialogReviewVisible = true;
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
  state.dialogReviewVisible = false;
};

const handleSubmit = (formData: any) => {
  planManagementEmergencyPlanSaveRequest(formData)
    .then((response: any) => {
      global.$message.success("提交成功");
      getData();
    })
    .catch((error: any) => {
      console.log(error);
      const message = global.$isNotEmpty(error.message)
        ? error.message
        : "提交失败";
      global.$message.error(message);
    });
};

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

const handleDelete = (id: number) => {
  planManagementEmergencyPlanDeleteRequest({
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

const handleDisposal = (rowData: any) => {
  state.dialogDisposalVisible = true;
  state.currentRowData = rowData;
};

const handleCloseHandling = () => {
  state.dialogDisposalVisible = false;
};

const handleSubmitDisposal = (formData: any) => {
  const disposalTime = global
    .$dayjs(formData.disposalTime)
    .format("YYYY-MM-DD HH:mm:ss");
  planManagementEmergencyPlanSaveDisposalRequest({
    ...formData,
    disposalTime,
  })
    .then((response: any) => {
      global.$message.success("提交成功");
      getData();
      state.dialogDisposalVisible = false;
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("提交失败");
      state.dialogDisposalVisible = false;
    });
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
