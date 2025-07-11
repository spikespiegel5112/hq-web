<template>
  <BaseTable
    class="plantable"
    :tableData="state.tableData"
    :dataModel="pageModel"
    height="100%"
    :pagination="false"
    tableBodyHeight="calc(100% - 0.4rem)"
    @onEdit="handleEdit"
    @onDelete="handleDelete"
  />
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
  preplanPreplanDeleteStepRequest,
  preplanPreplanGetStepPageRequest,
} from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const emit = defineEmits<{
  (e: "onEdit", tableData: any): void;
}>();

const props = defineProps({
  planId: { type: Number, required: true, default: null },
  editable: { type: Boolean, required: false, default: true },
  deleteable: { type: Boolean, required: false, default: true },
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
    actions: ["edit", "delete"],
  },
]);

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
const permissionCodeList = computed(() => {
  return global.$route.meta.permissionCodeList || [];
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

const getDataPromise = () => {
  return new Promise((resolve, reject) => {
    preplanPreplanGetStepPageRequest({
      prId: props.planId,
      pageSize: 1000,
    })
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
const tablePermissionCodeListWithAction = computed(() => {
  return [
    {
      code: "preplan:preplan:saveWithPreplanStep",
      action: "edit",
    },
    {
      code: "preplan:preplan:delete",
      action: "delete",
    },
  ];
});
const getData = () => {
  if (!global.$checkAuth(global, "planManagement:emergencyPlan:getPage"))
    return;
  global.$store.commit("app/updateTableLoading", true);
  pagination.total = undefined;
  getDataPromise()
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
  emit("onEdit", state.tableData);
};

const handleDelete = (id: number) => {
  preplanPreplanDeleteStepRequest({
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

const transformPageModel = () => {
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

onMounted(async () => {
  transformPageModel();
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.common_basetable_wrapper {
  margin: 0 auto;
  width: 95%;
  &.plantable {
    :deep(.ant-table-wrapper) {
      height: auto !important;
      .ant-btn {
        color: #44e9e7;
      }
    }
  }
}
</style>
