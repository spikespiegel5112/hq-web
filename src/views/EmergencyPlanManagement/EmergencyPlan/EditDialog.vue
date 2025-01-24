<template>
  <a-modal
    class="common_dailog_wrapper"
    v-model:open="state.visible"
    width="9rem"
    @cancel="handleClose"
  >
    <template #title>
      <CommonTitle :title="dialogTitle" />
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :disabled="props.mode === 'review'"
      :rules="rules"
      :label-col="{ style: { width: '120px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="planSource" label="来源">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.planSource"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$getDictionary(
                  'emergency_plan_plan_source'
                )"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{ state.formData.planSource }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="preplanResourceId" label="预案类型">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.preplanResourceId"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in eventList"
                :value="item.value"
                :key="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{ state.formData.preplanResourceId }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="planContent" label="预案内容">
            <a-textarea
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.planContent"
              placeholder="请输入"
              :rows="3"
              allow-clear
            >
            </a-textarea>
            <template v-if="props.mode === 'review'">
              {{ state.formData.planContent }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="planLevel" label="预案等级">
            <a-radio-group
              v-model:value="state.formData.planLevel"
              buttonStyle="solid"
            >
              <a-radio-button
                v-for="item in global.$getDictionary('planLevel')"
                :value="item.value"
              >
                {{ item.label }}
              </a-radio-button>
            </a-radio-group>
            <template v-if="props.mode === 'review'">
              {{ state.formData.planLevel }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="planTime" label="发生时间">
            <a-date-picker
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.planTime"
              format="YYYY-MM-DD"
              show-time
            ></a-date-picker>
            <template v-if="props.mode === 'review'">
              {{ global.$dayjs(state.formData.planTime).format("YYYY-MM-DD") }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- <a-row>
        <a-col :span="22">
          <a-form-item name="planStatus" label="状态">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.planStatus"
              placeholder="请选择"
              :disabled="props.mode === 'add'"
            >
              <a-select-option
                v-for="item in global.$getDictionary('planStatus')"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{ state.formData.planStatus }}
            </template>
          </a-form-item>
        </a-col>
      </a-row> -->
      <a-row>
        <a-col :span="22">
          <a-form-item name="attachment" label="附件">
            <CommonUpload
              v-if="global.$checkEditable(props.mode)"
              :attachmentList="state.formData.attachmentList"
            />
            <template v-if="props.mode === 'review'">
              <AttachmentReview
                :attachmentList="state.formData.attachmentList"
              />
            </template>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-row>
        <a-col :span="22">
          <a-button key="back" @click="handleClose">取消</a-button>
          <a-button key="submit" type="primary" @click="handleSubmit">
            确认
          </a-button>
        </a-col>
      </a-row>
    </template>
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
  onUnmounted,
} from "vue";

import type { Rule, RuleObject } from "ant-design-vue/es/form";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();
const fileList = ref([]);

const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSubmit", formData: any): void;
}>();

const props = defineProps({
  visible: { type: Boolean, required: true, default: false },
  mode: { type: [String, null], required: true, default: null },
  rowData: { type: Object, required: true, default: () => {} },
  dataModel: { type: Array, required: true, default: () => [] },
});

let state = reactive({
  visible: false,
  disposalResponseTime: 0,

  formData: {
    id: null as number | null | undefined,
    attachmentList: [] as any[],
    planCode: null,
    planContent: null,
    planLevel: null,
    planLocation: null,
    planSource: null,
    planStatus: null,
    planTime: null,
    preplanResourceId: null,
  } as any,
  fileList: [] as any[],
});

const eventList = computed(() => {
  let result = global.$store.state.app.currentEventTypeList.find(
    (item: any) => item.type === global.$store.state.app.emergencyPlanType
  )?.data;
  result = result.map((item: any) => {
    return {
      ...item,
      value: Number(item.value),
    };
  });
  return result;
});

const dialogTitle: ComputedRef<string> = computed(() => {
  return global.$store.state.dictionary.dialogMode.find(
    (item: any) => item.value === props.mode
  )?.title;
});

const rules: ComputedRef<RuleObject[]> = computed(() => {
  const validateNumber = (rule: any, value: any, callback: any) => {
    if (isNaN(Number(value))) {
      callback(new Error("请输入数字值"));
    } else {
      callback();
    }
  };
  const result: any = {};
  Object.keys(state.formData).forEach((item) => {
    const dataModelInfo = props.dataModel.find(
      (item2: any) => item2.name === item
    ) as any;
    if (!!dataModelInfo) {
      result[item] = [];
      if (dataModelInfo.required) {
        result[item].push({
          required: true,
          message: "请输入" + dataModelInfo.label,
          trigger: "change",
        });
        if (props.mode === "review") result[item] = false;
      }
      if (dataModelInfo.dataType === "number") {
        result[item].push({ validator: validateNumber, trigger: "change" });
      }
    }
  });
  return result;
});

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
    if (!!newValue) {
      await nextTick();
      if (["edit", "review", "disposal"].some((item) => item === props.mode)) {
        const formData = JSON.parse(JSON.stringify(props.rowData));
        state.formData = {
          ...formData,
          planTime: !!formData.planTime
            ? global.$dayjs(formData.planTime)
            : null,
        };
      }
      setUndeal();
    }
  }
);

const handleClose = () => {
  formDataRef.value.resetFields();
  emit("onClose");
  state.formData.attachmentList = [];
};

const handleSubmit = () => {
  const planTime = global
    .$dayjs(state.formData.planTime)
    .format("YYYY-MM-DD HH:mm:ss");
  if (props.mode === "add") {
    state.formData.id = undefined;
  }
  formDataRef.value
    .validate()
    .then(() => {
      emit("onSubmit", {
        ...state.formData,
        planTime,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

const setUndeal = () => {
  if (props.mode === "add") {
    const planStatusList = global.$getDictionary("planStatus");
    state.formData.planStatus = planStatusList[0].value;
  }
};

const handleChangeEventTime = (date: any) => {};

const handleChangeEventType = (value: any, event: any) => {
  state.formData.prId = event.key;
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
