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
          :action="infoManagementPublicSentimentInfoImportExcelRequest"
          @success="() => getData()"
        />
        <ExportButton
          :action="infoManagementPublicSentimentInfoExportExcelRequest"
          :queryFormData="queryFormData"
          :disabled="
            !global.$checkAuth(
              global,
              'infoManagement:publicSentimentInfo:export'
            )
          "
        />
        <a-button
          class="add"
          @click="handleAdd"
          :disabled="!global.$checkAuth(global, 'infoManagement:publicSentimentInfo:save')"
        >
          新增
        </a-button>
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :processedTableData="state.processedTableData"
      :tablePermissionCodeListWithAction="tablePermissionCodeListWithAction"
      :dataModel="pageModel"
      :pagination="pagination"
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
    <DisposalDialog
      :visible="state.dialogDisposalVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleCloseDisposal"
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
  infoManagementPublicSentimentInfoDeleteRequest,
  infoManagementPublicSentimentInfoHandleRequest,
  infoManagementPublicSentimentInfoGetPageRequest,
  infoManagementPublicSentimentInfoSaveRequest,
  infoManagementPublicSentimentInfoExportExcelRequest,
  infoManagementPublicSentimentInfoImportExcelRequest,
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import DisposalDialog from "./DisposalDialog.vue";

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
    label: "舆情类型",
    name: "publicSentimentType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "舆情来源",
    name: "publicSentimentSource",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "敏感程度",
    name: "publicSentimentSensitive",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "舆情内容",
    name: "publicSentimentContent",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    rows: 2,
  },
  {
    label: "舆情发生时间",
    name: "publicSentimentTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "2.3rem",
  },
  {
    label: "关键词",
    name: "keyword",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    rows: 2,
  },
  {
    label: "处置状态",
    name: "handlingStatus",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    tagConfig: {
      colorList: [
        { value: "未处置", color: "error" },
        { value: "处置中", color: "warning" },
        { value: "已处置", color: "success" },
      ],
    },
  },
  {
    label: "附件",
    name: "attachment",
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
    actions: ["edit", "review", "delete", "disposal"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  processedTableData: [] as any[],
  dialogVisible: false,
  dialogDisposalVisible: false,
  dialogMode: null as string | null,
  currentRowData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});
const permissionCodeList = computed(() => {
  return global.$route.meta.permissionCodeList || [];
});
const tablePermissionCodeListWithAction = computed(() => {
  return [
    {
      code: "infoManagement:publicSentimentInfo:save",
      action: "edit",
    },
    {
      code: "infoManagement:publicSentimentInfo:delete",
      action: "delete",
    },
    {
      code: "infoManagement:publicSentimentInfo:getOneById",
      action: "review",
    },
    {
      code: "infoManagement:publicSentimentInfo:importExcel",
      action: "importExcel",
    },
    {
      code: "infoManagement:publicSentimentInfo:exportExcel",
      action: "exportExcel",
    },
    {
      code: "infoManagement:publicSentimentInfo:handle",
      action: "disposal",
    },
  ];
});
const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  infoManagementPublicSentimentInfoGetPageRequest({
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
          handlingStatus: global
            .$getDictionary("disposalStatus")
            .find((item2: any) => item2.value === item.handlingStatus)?.label,
          publicSentimentSensitive: global
            .$getDictionary("sensitivity")
            .find((item2: any) => item2.value === item.publicSentimentSensitive)
            ?.label,
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
  infoManagementPublicSentimentInfoSaveRequest(formData)
    .then((response: any) => {
      global.$message.success(`操作成功`);
      getData();
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("操作失败");
    });
};

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

const handleDelete = (id: number) => {
  infoManagementPublicSentimentInfoDeleteRequest({
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
  state.dialogMode = "disposal";
};

const handleCloseDisposal = () => {
  state.dialogDisposalVisible = false;
};

const handleSubmitDisposal = (formData: any) => {
  infoManagementPublicSentimentInfoHandleRequest(formData)
    .then((response: any) => {
      global.$message.success(`操作成功`);
      getData();
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("操作失败");
    });
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
