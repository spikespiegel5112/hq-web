<template>
  <div class="common_filtertool_wrapper">
    <a-form :model="state.formData" autocomplete="off" ref="formDataRef">
      <a-row>
        <a-col :span="21">
          <a-row :gutter="20">
            <a-col :span="5">
              <a-form-item name="roleName" label="角色名称">
                <a-input
                  v-model:value="state.formData.roleName"
                  placeholder="请输入"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item name="roleStatus" label="角色状态">
                <a-select
                  v-model:value="state.formData.roleStatus"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in global.$getDictionary('roleStatus')"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="3" class="operation">
          <a-space>
            <a-button class="submitbutton" @click="handleReset">
              重置
            </a-button>
            <a-button
              class="submitbutton"
              type="primary"
              @click="handleSearch"
              :disabled="props.disabled"
            >
              查询
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
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

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const emit = defineEmits<{
  (e: "onSearch", formData: object): void;
  (e: "onReset", formData: object): void;
  (e: "update:modelValue", formData: object): void;
}>();

const props = defineProps({
  disabled: { type: Boolean, required: false, default: false },
});

const formDataRef: any = ref(null);

const state = reactive({
  formData: {
    roleName: null,
    roleStatus: null,
  },
  loginTime: null,
});

const handleSearch = () => {
  emit("onSearch", state.formData);
};

const handleReset = () => {
  formDataRef.value.resetFields();
  emit("onReset", state.formData);
};

onMounted(async () => {
  emit("update:modelValue", state.formData);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
