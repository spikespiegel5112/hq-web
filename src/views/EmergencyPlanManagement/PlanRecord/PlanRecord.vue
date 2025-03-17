<template>
  <div class="common_table_wrapper">
    <FilterTool
      @onSearch="handleSearch"
      @onReset="handleReset"
      v-model="queryFormData"
    ></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <ExportButton
          :action="planManagementEmergencyPlanExportRecordExcelRequest"
          :queryFormData="queryFormData"
        />
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
    <ReviewDialo
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    ></ReviewDialo>
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
  planManagementEmergencyPlanGetRecordPageRequest,
  planManagementEmergencyPlanDeleteRequest,
  planManagementEmergencyPlanSaveRequest,
  planManagementEmergencyPlanExportRecordExcelRequest,
} from "@/api/management";

import FilterTool from "./FilterTool.vue";
import ReviewDialo from "./ReviewDialog.vue";

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
  },
  {
    label: "预案等级",
    name: "planLevel",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    width: "1rem",
    colorConfig: {
      colorList: [
        { value: "黄色", color: "yellow" },
        { value: "橙色", color: "orange" },
        { value: "红色", color: "red" },
      ],
    },
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
    label: "处置完成时间",
    name: "disposalCompletionTime",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
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
    actions: ["detail"],
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

const eventList = computed(() => {
  let result = global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === global.$store.state.app.emergencyPlanType
  )?.data;
  result = result.map((item: any) => {
    return {
      ...item,
      value: Number(item.value),
    };
  });
  return result;
});

const tablePermissionCodeListWithAction = computed(() => {
  return [
    {
      code: "planManagement:emergencyPlan:detail",
      action: "detail",
    },
    {
      code: "planManagement:emergencyPlan:exportRecordExcel",
      action: "exportExcel",
    },
  ];
});
const getData = () => {
  if (
    !global.$checkAuth(global, "planManagement:emergencyPlan:getRecordPage")
  ) {
    return;
  }
  global.$store.commit("app/updateTableLoading", true);
  pagination.total = undefined;
  planManagementEmergencyPlanGetRecordPageRequest({
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
          preplanResourceId: eventList.value.find(
            (item2: any) => item2.value === item.preplanResourceId
          ).label,
          planLevel: global
            .$getDictionary("planLevel")
            .find((item2: any) => item2.value === item.planLevel)?.label,
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
  global.$store.commit("app/updateTableLoading", false);
};

const handleSubmit = (formData: any) => {
  planManagementEmergencyPlanSaveRequest(formData)
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

onMounted(async () => {
  getData();
});

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

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
