<template>
  <a-modal
    v-model:open="state.visible"
    @cancel="handleClose"
    width="12rem"
    @ok="handleDistributeRole"
  >
    <template #title>
      <CommonTitle title="分配角色" />
    </template>
    <div class="content">
      <a-transfer
        v-model:target-keys="targetKeys"
        v-model:selected-keys="selectedKeys"
        :data-source="state.allRoleData"
        :one-way="true"
        :titles="['Source', 'Target']"
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
import type { Rule, RuleObject } from "ant-design-vue/es/form";
import { sysSysRoleGetAllRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();
const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSubmit", formData: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
});

const disabled = ref<boolean>(false);

const targetKeys = ref<string[]>([]);

const selectedKeys = ref<string[]>(["1", "4"]);

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
});

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    getAllRoleData();
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

const handleDistributeRole = () => {};

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
