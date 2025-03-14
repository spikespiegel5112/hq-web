<template>
  <div class="common_table_wrapper">
    <a-tree
      v-if="state.treeData.length > 0"
      class="tree"
      v-model:selectedKeys="state.selectedKeys"
      v-model:checkedKeys="state.checkedKeys"
      defaultExpandAll
      :tree-data="state.treeData"
    >
      <template #title="record" #default="scope">
        <div class="node">
          <span class="title">
            {{ record.title }}
          </span>
          <a-button
            type="link"
            @click="handleEditNode(record, record.parentId, '编辑', 'edit')"
          >
            编辑
          </a-button>
          <a-button
            type="link"
            @click="
              handleEditNode(record, record.parentId, '添加子节点', 'add')
            "
          >
            添加子节点
          </a-button>
          <a-button
            type="link"
            @click="
              handleEditNode(record, record.parentId, '添加平级节点', 'add')
            "
          >
            添加平级节点
          </a-button>
          <a-button type="link" danger @click="handleDeleteNode(record)">
            删除
          </a-button>
        </div>
      </template>

      <template #slot:custom="{ title, key, aaa, bbb, ccc }"> dsadas </template>
    </a-tree>
    <EditDialog
      :visible="state.dialogVisible"
      :mode="state.dialogMode"
      :rowData="state.currentRowData"
      :title="state.currentDialogTitle"
      :parentId="state.currentParentId"
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
  sysSysMenuGetOneByIdRequest,
  sysSysMenuGetMenuTreeRequest,
  sysSysMenuSaveRequest,
  sysSysMenuDeleteRequest,
} from "@/api/management";

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
  children?: DataItem[];
}

import EditDialog from "./EditDialog.vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const columns = [
  {
    title: "菜单名称",
    dataIndex: "menuName",
    key: "menuName",
  },
  {
    title: "菜单描述",
    dataIndex: "menuDesc",
    key: "menuDesc",
  },
  {
    title: "菜单排序",
    dataIndex: "menuSort",
    key: "menuSort",
  },
  {
    title: "菜单图标",
    dataIndex: "menuIcon",
    key: "menuIcon",
  },
  {
    title: "权限编码",
    dataIndex: "permissionCode",
    key: "permissionCode",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];

const rowSelection = ref({
  checkStrictly: false,
  onChange: (
    selectedRowKeys: (string | number)[],
    selectedRows: DataItem[]
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (
    selected: boolean,
    selectedRows: DataItem[],
    changeRows: DataItem[]
  ) => {
    console.log(selected, selectedRows, changeRows);
  },
});

const state = reactive({
  treeData: [] as any[],
  expandedKeys: null,
  selectedKeys: null,
  checkedKeys: null,
  dialogVisible: false,
  dialogMode: null as string | null,
  currentRowData: {},
  currentDialogTitle: "",
  currentParentId: null,
});

let queryFormData = reactive({} as any);

const pagination = reactive({
  ...global.$store.state.app.defaultPagination,
});

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
  pagination.total = undefined;
  sysSysMenuGetMenuTreeRequest({
    ...queryFormData,
    ...pagination,
  })
    .then((response: any) => {
      response = response.data;
      const looper = (children: any[]) => {
        const result = [] as any;
        children.forEach((item: any) => {
          if (item.children instanceof Array && item.children.length > 0) {
            result.push({
              ...item,
              title: item.menuName,
              key: item.id,
              disabled: false,
              children: looper(item.children),
            });
          } else {
            result.push({
              ...item,
              title: item.menuName,
              key: item.id,
              disabled: false,
            });
          }
        });
        return result;
      };
      let result: any[] = looper(response);

      state.treeData = result;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleClose = () => {
  state.dialogVisible = false;
};

const handleEditNode = (
  record: any,
  parentId: number | null,
  title: string,
  type: string
) => {
  state.dialogVisible = true;
  state.dialogMode = type;
  state.currentDialogTitle = title;
  state.currentRowData = record;
  state.currentParentId = parentId;
};

const handleDeleteNode = (record: any) => {
  global.$confirm({
    title: "提示",
    content: "确认删除？",
    onOk: () => {
      const loadingInstance: any = global.$message.loading("处理中...", 0);
      sysSysMenuDeleteRequest({
        id: record.id,
      })
        .then((response: any) => {
          loadingInstance();
          global.$message.success("删除成功");
          getData();
        })
        .catch((error: any) => {
          loadingInstance();
          global.$message.error(error.message);
          console.log(error);
        });
    },
  });
};

const handleSubmit = (formData: any) => {
  const loadingInstance: any = global.$message.loading("处理中...", 0);
  sysSysMenuSaveRequest(formData)
    .then((response: any) => {
      loadingInstance();
      global.$message.success("提交成功");
      getData();
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error(error.message);
    });
};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
:deep(.ant-tree) {
  height: 10.5rem;
  .ant-tree-list {
    height: 100%;
    .ant-tree-list-holder {
      height: 100%;
      max-height: 100% !important;
      overflow: auto;
      .ant-tree-treenode {
        margin: auto;
        width: 10rem;
        .ant-tree-node-content-wrapper {
          width: 100%;
          .ant-tree-title {
            width: 100%;
            .node {
              display: flex;
              width: 100%;
              align-items: center;
              .title {
                display: inline-block;
                flex: 1;
              }
              .operation {
                display: inline-block;
                width: 3rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
