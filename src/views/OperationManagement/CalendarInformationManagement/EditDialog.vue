<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="8rem">
    <template #title>
      <div class="common_dislogtitle_item">
        <span class="sequre"></span>
        <span class="text"> {{ dialogTitle }}</span>
      </div>
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :rules="rules"
      :label-col="{ style: { width: '170px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item
            name="calendarDate"
            label="日期"
            :label-col="{ style: { width: '100px' } }"
          >
            <a-date-picker
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.calendarDate"
              format="YYYY-MM-DD"
              @change="handleChangeDutyTime"
              allow-clear
            />
            <template v-if="props.mode === 'review'">
              {{ state.formData.staffName }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item
            name="dateType"
            label="日期类型"
            :label-col="{ style: { width: '100px' } }"
          >
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.dateType"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$getDictionary('dateType')"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{ state.formData.dateType }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item
            name="exhibitionType"
            label="展会类型"
            :label-col="{ style: { width: '100px' } }"
          >
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.exhibitionType"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$getDictionary('exhibitionType')"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{
                global.$dayjs(state.formData.dutyStartTime).format("YYYY-MM-DD")
              }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-row>
        <a-col :span="23">
          <template
            v-if="
              ['edit', 'add', 'disposal'].some((item) => item === props.mode)
            "
          >
            <a-button key="back" @click="handleClose">取消</a-button>
            <a-button key="submit" type="primary" @click="handleSubmit">
              确认
            </a-button>
          </template>
          <template v-else-if="props.mode === 'review'">
            <a-button key="submit" type="primary" @click="handleClose">
              关闭
            </a-button>
          </template>
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
} from "vue";
import type { Rule, RuleObject } from "ant-design-vue/es/form";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();

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

const state = reactive({
  visible: false,
  formData: {
    id: null as number | null | undefined,
    calendarDate: null,
    dateType: null,
    exhibitionType: null,
  },
  dutyTime: [],
}) as any;

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
        const rowData = JSON.parse(JSON.stringify(props.rowData));
        Object.keys(state.formData).forEach((item) => {
          state.formData[item] = rowData[item];
          if (item === "calendarDate") {
            state.formData[item] = !!rowData[item]
              ? global.$dayjs(rowData[item])
              : null;
          }
        });
      }
    }
  }
);

const handleClose = () => {
  formDataRef.value.resetFields();
  state.dutyTime = [];
  emit("onClose");
};

const handleSubmit = () => {
  formDataRef.value
    .validate()
    .then(() => {
      if (props.mode === "add") {
        state.formData.id = undefined;
      }
      const calendarDate = global
        .$dayjs(state.formData.calendarDate)
        .format("YYYY-MM-DD");

      emit("onSubmit", {
        ...state.formData,
        calendarDate,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleChangeDutyTime = (value: any) => {};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
