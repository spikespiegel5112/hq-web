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
      :dataModel="pageModel"
      :pagination="pagination"
      :permissionCodeListWithAction="permissionCodeListWithAction"
      @onEdit="handleEdit"
      @onReview="handleReview"
      @onChangePage="handleChangePage"
      @onDelete="handleDelete"
      @onDistributeAuthority="handleDistributeRole"
    />
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :dataModel="pageModel"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmit"
    ></EditDialog>
    <DistributeAuthorityDialog
      :visible="state.dialogDistributeAuthorityVisible"
      :rowData="state.currentRowData"
      @onClose="handleClose"
      @onSubmit="handleSubmitDistributeAuthority"
    ></DistributeAuthorityDialog>
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
  sysSysRoleGetPage,
  sysSysRoleSave,
  sysSysRoleDelete,
  sysSysRoleDeletes,
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";
import DistributeAuthorityDialog from "./DistributeAuthorityDialog.vue";

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
    label: "角色名称",
    name: "roleName",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "角色描述",
    name: "roleDesc",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "角色顺序",
    name: "roleSort",
    required: true,
    dataType: "number",
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "角色状态",
    name: "roleStatus",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
    tagConfig: {
      val: "roleStatus",
      dictionary: global.$store.state.dictionary.roleStatus,
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
    actions: ["edit", "distributeAuthority", "delete"],
  },
]);

const state = reactive({
  tableData: [] as any[],
  dialogVisible: false,
  dialogDistributeAuthorityVisible: false,
  dialogMode: null as string | null,
  currentRowData: {},
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const permissionCodeListWithAction = computed(() => {
  return [
    {
      code: "system:sysRole:save",
      action: "edit",
    },
    {
      code: "system:sysRole:delete",
      action: "delete",
    },
    {
      code: "system:sysRole:getOneById",
      action: "review",
    },
    {
      code: "system:sysRole:allocateMenu",
      action: "distributeAuthority",
    },
    
  ];
});

const getData = () => {
  // global.$store.commit("app/updateTableLoading", true);
  pagination.total = undefined;
  sysSysRoleGetPage({
    ...queryFormData,
    ...pagination,
  })
    .then((response: any) => {
      response = response.data;
      state.tableData = response.list;
      pagination.total = response.total;
      // global.$store.commit("app/updateTableLoading", false);
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

const handleClose = async () => {
  state.dialogVisible = false;
  state.dialogDistributeAuthorityVisible = false;
  await nextTick();
  // global.$store.commit("app/updateTableLoading", false);
  // global.$store.commit("app/updateTableLoading", false);
};

const handleSubmit = (formData: any) => {
  sysSysRoleSave(formData)
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

const handleSubmitDistributeAuthority = (rowData: any) => {};

const handleChangePage = (pagingData: any) => {
  pagination.page = pagingData.current;
  pagination.pageSize = pagingData.pageSize;
  pagination.total = pagingData.total;
  getData();
};

const handleDelete = (id: number) => {
  sysSysRoleDelete({
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

const handleDistributeRole = (rowData: any) => {
  state.dialogDistributeAuthorityVisible = true;
  state.currentRowData = rowData;
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
