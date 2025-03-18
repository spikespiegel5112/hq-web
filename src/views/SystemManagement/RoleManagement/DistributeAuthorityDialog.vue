<template>
  <a-drawer
    class="distributeauthoritydialog_wrapper"
    v-model:open="state.visible"
    width="12rem"
    @close="handleClose"
    @afterOpenChange="handleOpen"
  >
    <template #title>
      <CommonTitle :title="`分配权限（角色：${rowData.roleName}）`" />
    </template>
    <template #extra>
      <a-button style="margin-right: 8px" @click="checkAll">全选</a-button>
      <a-button style="margin-right: 8px" @click="handleClose">取消</a-button>
      <a-button type="primary" @click="handleDistributeRole">保存</a-button>
    </template>
    <div class="content">
      <!-- {{ state.checkedKeys }} -->
      <a-tree
        v-if="state.treeData.length > 0"
        class="tree"
        v-model:selectedKeys="state.selectedKeys"
        v-model:checkedKeys="state.checkedKeys"
        checkable
        selectable
        checkStrictly
        blockNode
        :autoExpandParent="true"
        :tree-data="state.treeData"
        defaultExpandAll
        @check="handleCheckNode"
        @select="handleCheckNode"
      >
        <template #title="record" #default="scope">
          <div class="node">
            <span class="title">
              {{ record.title }}
            </span>
          </div>
        </template>
      </a-tree>
    </div>
  </a-drawer>
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
  toRaw,
  nextTick,
} from "vue";
import type { UnwrapRef } from "vue";

import {
  sysSysRoleGetAllRequest,
  sysSysUserGetOneByIdRequest,
  sysSysMenuGetMenuTreeRequest,
  sysSysRoleGetOneById,
  sysSysRoleAllocateMenuRequest,
} from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const emit = defineEmits<{
  (e: "onClose", visible: boolean): void;
  (e: "onSubmit", formData: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  rowData: { type: Object, required: true, default: {} },
});

const state: UnwrapRef<any> = reactive({
  visible: false,
  treeData: [] as any[],
  allRoleData: [] as any[],
  targetKeys: [] as any[],
  expandedKeys: null,
  selectedKeys: null,
  checkedKeys: {},
});

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    state.selectedKeys = [];
    if (!!newValue) {
      getAllRoleData();
    }
  }
);

const handleClose = () => {
  emit("onClose", false);
};

const checkAll = () => {
  state.checkedKeys.checked = [];
  console.log(state.treeData);
  const looper = (children: any[]) => {
    children.forEach((item: any, index: number) => {
      state.checkedKeys.checked.push(item.id);
      if (item.children instanceof Array && item.children.length > 0) {
        looper(item.children);
      }
    });
  };
  looper(state.treeData);
};

const handleOpen = () => {
  getTreeData();
};

const getRoleData = () => {
  sysSysRoleGetOneById({
    id: props.rowData.id,
  })
    .then((response: any) => {
      response = response.data;
      state.sysMenuList = response.sysMenuList;
      state.checkedKeys.checked = response.sysMenuList.map(
        (item: any) => item.id
      );
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const getTreeData = () => {
  global.$store.commit("app/updateTableLoading", true);
  sysSysMenuGetMenuTreeRequest({})
    .then((response: any) => {
      response = response.data;
      const looper = (children: any[]) => {
        const result = [] as any;
        children.forEach((item: any) => {
          if (item.children instanceof Array && item.children.length > 0) {
            result.push({
              ...item,
              // title: `${item.menuName}（${item.permissionCode}）`,
              title: `${item.menuName}（${item.permissionCode}）`,
              key: item.id,
              disabled: false,
              children: looper(item.children),
            });
          } else {
            result.push({
              ...item,
              title: `${item.menuName}（${item.permissionCode}）`,
              key: item.id,
              disabled: false,
            });
          }
        });
        return result;
      };
      let result: any[] = looper(response);

      state.treeData = result;
      getRoleData();
      global.$store.commit("app/updateTableLoading", false);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const getAllRoleData = () => {
  sysSysRoleGetAllRequest()
    .then((response: any) => {
      state.allRoleData = response.data.map((item: any) => {
        return {
          ...item,
          key: item.id,
          title: item.roleName,
        };
      });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleDistributeRole = () => {
  console.log(state.targetKeys);
  console.log(state.checkedKeys.checked);
  sysSysRoleAllocateMenuRequest({
    menuIdList: state.checkedKeys.checked,
    roleId: props.rowData.id,
  })
    .then((response: any) => {
      getAllRoleData();
      global.$message.success("操作成功");
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("操作失败");
    });
};

const handleCheckNode = (checkIdList: any, checkedNode: any) => {
  console.log(state.selectedKeys);
  console.log(state.checkedKeys.checked);

  // const checkedKeys = state.checkedKeys.checked.checked;

  const selectedKey = checkedNode.node.id;
  console.log(state.checkedKeys.checked);

  if (state.checkedKeys.checked.includes(selectedKey)) {
    let checkedIndex;
    state.checkedKeys.checked.forEach((item1: any, index2: number) => {
      if (item1 === selectedKey) {
        console.log(checkedNode);
        checkedIndex = index2;
      }
    });
    state.checkedKeys.checked.splice(checkedIndex, 1);
  } else {
    state.checkedKeys.checked.push(selectedKey);
  }
  console.log(state.checkedKeys.checked);
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.common_title_item {
  margin: 0;
}

:deep(.ant-drawer) {
  background-color: red;

  .distributeauthoritydialog_wrapper {
    .content {
      display: flex;
      justify-content: center;
      text-align: center;
      .ant-tree {
        width: 10rem;
        :deep(.ant-tree-list) {
          width: 6rem;
          height: 8rem;
        }
      }
    }
    .ant-drawer-close {
      position: absolute;
      right: 0;
      float: right;
    }
  }
}
</style>
