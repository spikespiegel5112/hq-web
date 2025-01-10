<template>
  <a-modal
    v-model:open="state.visible"
    width="12rem"
    @cancel="handleClose"
    @ok="handleDistributeRole"
  >
    <template #title>
      <CommonTitle title="分配角色" />
    </template>
    <div class="content">
      <a-transfer
        v-model:target-keys="state.targetKeys"
        v-model:selectedKeys="state.selectedKeys"
        :data-source="state.allRoleData"
        :titles="['待分配角色', '已分配角色']"
        :render="(item:any) => item.title"
        :disabled="disabled"
        @change="handleChange"
        @selectChange="handleSelectChange"
        @scroll="handleScroll"
      />
    </div>
  </a-modal>
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
  sysSysUserAllocateRoleRequest,
  sysSysUserGetOneByIdRequest,
} from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();
const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSubmit", formData: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  rowData: { type: Object, required: true, default: {} },
});

const disabled = ref<boolean>(false);

interface MockData {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
}
const mockData: MockData[] = [];

const state: UnwrapRef<any> = reactive({
  visible: false,
  formData: {
    id: null as number | null | undefined,
    loginTime: null,
    nickName: null,
    password: null,
    phoneNumber: null,
    userStatus: "0",
    username: null,
  },
  allRoleData: [] as any[],
  targetKeys: [] as any[],
  selectedKeys: [] as any[],
});

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    state.selectedKeys = [];
    getAllRoleData();
    getDistributedRolesDataByUserId();
  }
);

const handleChange = (
  nextTargetKeys: string[],
  direction: string,
  moveKeys: string[]
) => {
  console.log("targetKeys: ", nextTargetKeys);
  console.log("direction: ", direction);
  console.log("moveKeys: ", moveKeys);
};

const handleSelectChange = (
  sourceSelectedKeys: string[],
  targetSelectedKeys: string[]
) => {
  // state.targetKeys = targetSelectedKeys;
  console.log("sourceSelectedKeys: ", sourceSelectedKeys);
  console.log("targetSelectedKeys: ", targetSelectedKeys);
};

const handleScroll = (direction: string, e: Event) => {
  console.log("direction:", direction);
  console.log("target:", e.target);
};

const handleClose = () => {
  emit("onClose");
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

const getDistributedRolesDataByUserId = () => {
  sysSysUserGetOneByIdRequest({
    id: props.rowData.id,
  })
    .then((response: any) => {
      console.log(response);
      response = response.data;
      state.targetKeys = response.sysRoleList.map((item: any) => item.id);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleDistributeRole = () => {
  sysSysUserAllocateRoleRequest({
    roleIdList: state.targetKeys,
    userId: props.rowData.id,
  })
    .then((response: any) => {
      global.$message.success("操作成功");
      getAllRoleData();
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error("操作失败");
    });
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: center;
  text-align: center;
  .ant-transfer {
    width: 10rem;
    :deep(.ant-transfer-list) {
      width: 6rem;
      height: 8rem;
    }
  }
}
</style>
