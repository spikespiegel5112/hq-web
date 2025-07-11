<template>
  <div class="common_table_wrapper">
    <FilterTool
      @onSearch="handleSearch"
      @onReset="handleReset"
      :disabled="!global.$checkAuth(global, 'operationManagement:calendarInfo:getPage')"
      v-model="queryFormData"
    ></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <ImportButton
          :action="operationManagementCalendarInfoImportExcelRequest"
        @success="() => getData()"
          :disabled="
            !global.$checkAuth(global, 'operationManagement:calendarInfo:export')
          "
        />
        <ExportButton
          :action="operationManagementCalendarInfoExportExcelRequest"
          :queryFormData="queryFormData"
          :disabled="
            !global.$checkAuth(global, 'operationManagement:calendarInfo:export')
          "
        />
        <a-button
          class="add"
          @click="handleAdd"
          :disabled="!global.$checkAuth(global, 'operationManagement:calendarInfo:save')"
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
    />
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    >
    </EditDialog>
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
  operationManagementCalendarInfoGetPageRequest,
  operationManagementCalendarInfoDeleteRequest,
  operationManagementCalendarInfoSaveRequest,
  operationManagementCalendarInfoExportExcelRequest,
  operationManagementCalendarInfoImportExcelRequest,
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";

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
    label: "日期",
    name: "calendarDate",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "日期类型",
    name: "dateType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "展会类型",
    name: "exhibitionType",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "日历动态",
    name: "calendarDynamic",
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
  processedTableData: [] as any[],
  dialogVisible: false,
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
      code: "operationManagement:calendarInfo:save",
      action: "edit",
    },
    {
      code: "operationManagement:calendarInfo:delete",
      action: "delete",
    },
    {
      code: "operationManagement:calendarInfo:getOneById",
      action: "review",
    },
    {
      code: "operationManagement:calendarInfo:importExcel",
      action: "importExcel",
    },
    {
      code: "operationManagement:calendarInfo:exportExcel",
      action: "exportExcel",
    },
    {
      code: "operationManagement:calendarInfo:getDisposal",
      action: "eventDisposal",
    },
    {
      code: "operationManagement:calendarInfo:saveDisposal",
      action: "saveDisposal",
    },
  ];
});
const getData = () => {
  if (!global.$checkAuth(global, "operationManagement:calendarInfo:getPage")) return;
  global.$store.commit("app/updateTableLoading", true);
  pagination.total = undefined;
  operationManagementCalendarInfoGetPageRequest({
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
          dateType: global
            .$getDictionary("dateType")
            .find((item2: any) => item2.value === item.dateType)?.label,
          exhibitionType: global
            .$getDictionary("exhibitionType")
            .find((item2: any) => item2.value === item.exhibitionType)?.label,
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
  operationManagementCalendarInfoSaveRequest(formData)
    .then((response: any) => {
      global.$message.success("操作成功");
      getData();
    })
    .catch((error: any) => {
      global.$message.error(error.message || "操作失败");
      console.log(error);
    });
};

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

const handleDelete = (id: number) => {
  operationManagementCalendarInfoDeleteRequest({
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

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
