<template>
  <a-modal
    v-model:open="props.visible"
    :title="dialogTitle"
    @cancel="handleClose"
    width="8rem"
  >
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :label-col="{ style: { width: '80px' } }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item name="userName" label="事件类型">
            <a-input v-model="state.formData.userName" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="userName" label="时间">
            <a-input v-model="state.formData.userName" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item name="password" label="事件等级">
            <a-input v-model="state.formData.password" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item name="password" label="处置步骤">
            <a-radio-group v-model:value="state.formData.password">
              <a-radio :style="radioStyle" :value="1">
                第一步<span>上报领导/部门/单位</span>
              </a-radio>
              <a-radio :style="radioStyle" :value="2">
                第二步<span>上报领导/部门/单位</span>
              </a-radio>
              <a-radio :style="radioStyle" :value="3">
                第三步<span>上报领导/部门/单位</span>
              </a-radio>
              <a-radio :style="radioStyle" :value="3">
                第四步<span>上报领导/部门/单位</span>
              </a-radio>
              <a-radio :style="radioStyle" :value="4">
                More...
                <a-input
                  v-if="state.formData.password === 4"
                  style="width: 100px; margin-left: 10px"
                />
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item name="password" label="事件描述">
            <a-input v-model="state.formData.password" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item name="password" label="附件">
            <a-input v-model="state.formData.password" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
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
  nextTick,
} from "vue";

import { screenBannerInfoRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();

const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSubmit", formData: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  mode: { type: String, required: true, default: "" },
  rowData: { type: Object, required: true, default: () => {} },
});

const state = reactive({
  formData: {
    userName: "",
    password: "",
  },
});

const radioStyle = computed(() => {
  return {
    display: "flex",
    height: "30px",
    lineHeight: "30px",
  };
});

const dialogTitle: ComputedRef<string> = computed(() => {
  return global.$store.state.dictionary.dialogMode.find(
    (item: any) => item.value === props.mode
  )?.title;
});

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    if (!!newValue) {
      await nextTick();
      if (["edit", "review"].some((item) => item === props.mode)) {
        state.formData = JSON.parse(JSON.stringify(props.rowData));
      }
    }
  }
);

const handleClose = (event: any) => {
  formDataRef.value.resetFields();
  emit("onClose");
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
