<template>
  <div class="common_table_wrapper">
    <FilterTool
      @onSearch="handleSearch"
      @onReset="handleReset"
      :disabled="!global.$checkAuth(global, 'system:dictionary:getPage')"
      :dictionaryNameList="props.dictionaryNameList"
    ></FilterTool>
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <a-button
          class="add"
          @click="handleAdd"
          :disabled="!global.$checkAuth(global, 'system:dictionary:saveDict')"
        >
          新增
        </a-button>
      </a-space>
    </div>
    <BaseTable
      :tableData="state.tableData"
      :tablePermissionCodeListWithAction="tablePermissionCodeListWithAction"
      :dataModel="pageModel"
      :pagination="pagination"
      tabTable
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
      :dictionaryNameList="props.dictionaryNameList"
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
} from "vue";

import type { DefaultOptionType } from "ant-design-vue/es/select";

import {
  dictionaryManageGetDictItemPagingRequest,
  dictionaryManageSaveDictItemRequest,
  dictionaryManageDelDelDictItemRequest,
  dictionaryManageGetDictPagingRequest,
} from "@/api/management";
import FilterTool from "../FilterTool.vue";
import EditDialog from "./EditDialog.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  dictionaryNameList: {
    type: Array,
    required: false,
    default: () => {
      return [] as DefaultOptionType[];
    },
  },
});

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
    label: "字典名称",
    name: "dicName",
    required: true,
    tableVisible: true,
    formVisible: false,
    exportVisible: true,
  },
  {
    label: "字典名ID",
    name: "dicId",
    required: true,
    tableVisible: false,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "字典编码",
    name: "code",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "字典项标题",
    name: "label",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "字典项值",
    name: "value",
    required: true,
    tableVisible: true,
    formVisible: true,
    exportVisible: true,
  },
  {
    label: "字典项详细信息",
    name: "remark",
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
  dialogVisible: false,
  dialogMode: null as string | null,
  currentRowData: {},
  dictionaryNameList: [],
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
      code: "system:dictionary:save",
      action: "edit",
    },
    {
      code: "system:dictionary:delete",
      action: "delete",
    },
    {
      code: "system:dictionary:getOneById",
      action: "review",
    },
    {
      code: "system:dictionary:importExcel",
      action: "importExcel",
    },
    {
      code: "system:dictionary:exportExcel",
      action: "exportExcel",
    },
    {
      code: "system:dictionary:getDisposal",
      action: "eventDisposal",
    },
    {
      code: "system:dictionary:saveDisposal",
      action: "saveDisposal",
    },
  ];
});
const getData = () => {
  if (!global.$checkAuth(global, "system:dictionary:getPage")) return;
  global.$store.commit("app/updateTableLoading", true);
  dictionaryManageGetDictItemPagingRequest({
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

const handleSubmit = (formData: any, code: string) => {
  dictionaryManageSaveDictItemRequest(formData)
    .then((response: any) => {
      global.$message.success("提交成功");
      getData();
      global.$getDictionary(code, true);
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("提交失败");
    });
};

const handleDelete = (id: number, row: any) => {
  dictionaryManageDelDelDictItemRequest({
    id,
  })
    .then((response: any) => {
      global.$message.success("删除成功");
      getData();
      global.$getAllDictionary(row.code, true);
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

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
