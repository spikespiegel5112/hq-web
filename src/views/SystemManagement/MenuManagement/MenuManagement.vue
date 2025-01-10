<template>
  <div class="common_table_wrapper">
    <div class="common_tableoperation_wrapper">
      <a-space size="middle" wrap>
        <a-button class="add" @click="handleAdd">新增</a-button>
      </a-space>
    </div>
    <a-tree
      checkable
      v-model:expandedKeys="state.expandedKeys"
      v-model:selectedKeys="state.selectedKeys"
      v-model:checkedKeys="state.checkedKeys"
      :tree-data="state.treeData"
    >
      <template #title="{ title, key }">
        <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
        <template v-else>{{ title }}</template>
      </template>
    </a-tree>
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
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
} from "vue";

import {
  sysSysMenuDeleteRequest,
  sysSysMenuDeletes,
  sysSysMenuGetOneByIdRequest,
  sysSysMenuGetPageRequest,
  sysSysMenuSaveRequest,
} from "@/api/management";
import FilterTool from "./FilterTool.vue";
import EditDialog from "./EditDialog.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  treeData: [] as any[],
  expandedKeys: null,
  selectedKeys: null,
  checkedKeys: null,
  dialogVisible: false,
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
  sysSysMenuGetPageRequest({
    ...queryFormData,
    ...pagination,
  })
    .then((response: any) => {
      response = response.data.list;
      response = response.map((item: any) => {
        return {
          ...item,
          title: item.menuName,
          key: item.id,
          disabled: false,
        };
      });
      state.treeData = response;

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
  sysSysUserSave(formData)
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
  sysSysUserDelete({
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
