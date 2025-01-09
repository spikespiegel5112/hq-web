<template>
  <div class="common_table_wrapper">
    <FilterTool
      @onSearch="handleSearch"
      @onReset="handleReset"
      v-model="queryFormData"
    ></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <ImportButton
          :action="eventManageSuddenEventImportRequest"
          @success="() => getData()"
        />
        <ExportButton
          :action="eventManageSuddenEventExportRequest"
          :queryFormData="queryFormData"
        />
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
  eventManageSuddenEventGetPageRequest,
  eventManageSuddenEventDeleteRequest,
  eventManageSuddenEventSaveRequest,
  eventManageSuddenEventSaveDisposalRequest,
  eventManageSuddenEventExportRequest,
  eventManageSuddenEventImportRequest,
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import DisposalDialog from "./DisposalDialog.vue";
import ReviewDialog from "./ReviewDialog.vue";
import { dictionaryManageSaveDictItemRequest } from "../../../api/management";

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
    label: "管理区域",
    name: "manageRegion",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "2rem",
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
    label: "详细地址",
    name: "eventLocation",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1.5rem",
  },
  {
    label: "事件内容",
    name: "eventContent",
    rows: 2,
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "等级",
    name: "eventLevel",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1rem",
  },
  {
    label: "突发事件编码",
    name: "eventType",
    required: true,
    tableVisible: false,
    formVisible: true,
    exportVisible: true,
    width: "1.5rem",
  },
  {
    label: "发生时间",
    name: "eventTime",
    required: true,
    tableVisible: true,
    formVisible: false,
    exportVisible: false,
    width: "2.5rem",
  },
  {
    label: "状态",
    name: "eventStatus",
    required: true,
    tableVisible: true,
    formVisible: false,
    exportVisible: false,
    tagConfig: {
      colorList: [
        { value: "未处理", color: "error" },
        { value: "处理中", color: "warning" },
        { value: "未处理", color: "success" },
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
  dialogMode: null as string | null,
  currentRowData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  pagination.total = undefined;
  eventManageSuddenEventGetPageRequest({
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
          eventStatus: global
            .$getDictionary("eventStatus")
            .find((item2: any) => item2.value === item.eventStatus).label,
          eventLevel: global
            .$getDictionary("eventLevel")
            .find((item2: any) => item2.value === item.eventLevel).label,
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
  global.$store.commit("app/updateTableLoading", false);
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

const handleDisposal = (rowData: any) => {
  state.dialogDisposalVisible = true;
  state.currentRowData = rowData;
};

const handleCloseHandling = () => {
  state.dialogDisposalVisible = false;
  global.$store.commit("app/updateTableLoading", false);
};

const handleSubmitDisposal = (formData: any) => {
  const disposalTime = global
    .$dayjs(formData.disposalTime)
    .format("YYYY-MM-DD HH:mm:ss");
  eventManageSuddenEventSaveDisposalRequest({
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

const handleImport = () => {
  // 假设你有一个文件input元素，比如<input type="file" id="fileInput">
  // const fileInput = docuemnt.create;
  // const fileInput: any = document.getElementById("fileInput");
  // // 当用户选择文件后，触发上传
  // fileInput.addEventListener("change", function () {
  //   const file = this.files[0]; // 获取文件
  //   const formData = new FormData(); // 创建FormData对象
  //   formData.append("file", file); // 将文件添加到FormData对象中
  //   eventManageSuddenEventImportRequest()
  //     .then((response: any) => {
  //       console.log(response);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // });
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
