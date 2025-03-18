<template>
  <div class="common_table_wrapper">
    <FilterTool
      @onSearch="handleSearch"
      @onReset="handleReset"
      v-model="queryFormData"
    ></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <a-button class="add" @click="handleAdd">新增</a-button>
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :tablePermissionCodeListWithAction="tablePermissionCodeListWithAction"
      :dataModel="pageModel"
      :pagination="pagination"
      @onEdit="handleEdit"
      @onReview="handleReview"
      @onChangePage="handleChangePage"
      @onDelete="handleDelete"
      @onDistributeRole="handleDistributeRole"
    />
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    ></EditDialog>
    <DistributeRoleDialog
      :visible="state.dialogDistributeVisible"
      :rowData="state.currentRowData"
      @onClose="handleCloseDistributeRoleDialog"
    ></DistributeRoleDialog>
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
  sysSysUserGetPageRequest,
  sysSysUserSaveRequest,
  sysSysUserDeleteRequest,
  sysSysUserDeletesRequest,
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import DistributeRoleDialog from "./DistributeRoleDialog.vue";

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
    label: "用户名",
    name: "username",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },

  {
    label: "昵称",
    name: "nickName",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "密码",
    name: "password",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "手机号码",
    name: "phoneNumber",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "登录时间",
    name: "loginTime",
    required: false,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "用户状态",
    name: "userStatus",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    tagConfig: {
      val: "userStatus",
      dictionary: global.$store.state.dictionary.userStatus,
      colorList: [
        { value: 0, color: "success" },
        { value: 1, color: "warning" },
      ],
    },
  },
  {
    label: "操作",
    name: "operationColumn",
    tableVisible: true,
    exportVisible: false,
    fixed: "right",
    actions: ["edit", "delete", "distributeRole"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  dialogVisible: false,
  dialogDistributeVisible: false,
  dialogMode: null as string | null,
  currentRowData: {},
  allRoleData: [] as any[],
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
      code: "planManagement:emergencyPlan:save",
      action: "edit",
    },
    {
      code: "planManagement:emergencyPlan:delete",
      action: "delete",
    },
    {
      code: "planManagement:emergencyPlan:getOneById",
      action: "review",
    },
    {
      code: "planManagement:emergencyPlan:importExcel",
      action: "importExcel",
    },
    {
      code: "planManagement:emergencyPlan:exportExcel",
      action: "exportExcel",
    },
    {
      code: "planManagement:emergencyPlan:getDisposal",
      action: "eventDisposal",
    },
    {
      code: "planManagement:emergencyPlan:saveDisposal",
      action: "saveDisposal",
    },
  ];
});
const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  pagination.total = undefined;
  sysSysUserGetPageRequest({
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

const handleDistributeRole = (rowData: any) => {
  state.dialogDistributeVisible = true;
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

const handleCloseDistributeRoleDialog = () => {
  state.dialogDistributeVisible = false;
};

const handleSubmit = (formData: any) => {
  sysSysUserSaveRequest(formData)
    .then((response: any) => {
      global.$message.success("提交成功");
      getData();
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error(error.message);
    });
};

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

const handleDelete = (id: number) => {
  sysSysUserDeleteRequest({
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
