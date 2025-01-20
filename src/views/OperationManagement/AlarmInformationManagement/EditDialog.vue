<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="12rem">
    <template #title>
      <CommonTitle :title="dialogTitle" />
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :rules="rules"
      :label-col="{ style: { width: '170px' } }"
    >
      <a-row>
        <a-col :span="11">
          <a-form-item
            name="staffName"
            label="人员姓名"
            :label-col="{ style: { width: '100px' } }"
          >
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.staffName"
              placeholder="请输入"
            >
            </a-input>
            <template v-if="props.mode === 'review'">
              {{ state.formData.staffName }}
            </template>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="staffPhone" label="人员电话">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.staffPhone"
              placeholder="请输入"
            >
            </a-input>
            <template v-if="props.mode === 'review'">
              {{ state.formData.staffPhone }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="11">
          <a-form-item
            name="staffJob"
            label="人员职务"
            :label-col="{ style: { width: '100px' } }"
          >
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.staffJob"
              placeholder="请输入"
            >
            </a-input>
            <template v-if="props.mode === 'review'">
              {{ state.formData.staffJob }}
            </template>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="hocStaffName" label="HOC值班人员姓名">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.hocStaffName"
              placeholder="请输入"
            >
            </a-input>
            <template v-if="props.mode === 'review'">
              {{ state.formData.hocStaffName }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="11">
          <a-form-item
            name="dutyStartTime"
            label="值班时间"
            :label-col="{ style: { width: '100px' } }"
          >
            <el-date-picker
              v-if="global.$checkEditable(props.mode)"
              type="datetimerange"
              placeholder="请选择"
              v-model="state.dutyTime"
              @change="handleChangeDutyTime"
            />
            <template v-if="props.mode === 'review'">
              {{
                global.$dayjs(state.formData.dutyStartTime).format("YYYY-MM-DD")
              }}
              -
              {{
                global.$dayjs(state.formData.dutyEndTime).format("YYYY-MM-DD")
              }}
            </template>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="hocStaffPhone" label="HOC值班人员电话">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.hocStaffPhone"
              placeholder="请输入"
            >
            </a-input>
            <template v-if="props.mode === 'review'">
              {{ state.formData.hocStaffPhone }}
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
    dutyEndTime: null,
    dutyStartTime: null,
    hocStaffJob: null,
    hocStaffName: null,
    hocStaffPhone: null,
    staffJob: null,
    staffName: null,
    staffPhone: null,
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
        let rowData = JSON.parse(JSON.stringify(props.rowData));
        rowData = {
          ...rowData,
        };
        state.dutyTime = [
          global.$dayjs(rowData.dutyStartTime, "YYYY-MM-DD HH:mm:ss"),
          global.$dayjs(rowData.dutyEndTime, "YYYY-MM-DD HH:mm:ss"),
        ];
        state.formData.dutyStartTime = global.$dayjs(
          rowData.dutyStartTime,
          "YYYY-MM-DD HH:mm:ss"
        );
        state.formData.dutyEndTime = global.$dayjs(
          rowData.dutyEndTime,
          "YYYY-MM-DD HH:mm:ss"
        );
        Object.keys(state.formData).forEach((item: string) => {
          state.formData[item] = global.$isNotEmpty(rowData[item])
            ? rowData[item]
            : undefined;
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
      const dutyStartTime = global
        .$dayjs(state.dutyTime[0])
        .format("YYYY-MM-DD HH:mm:ss");
      const dutyEndTime = global
        .$dayjs(state.dutyTime[1])
        .format("YYYY-MM-DD HH:mm:ss");
      emit("onSubmit", {
        ...state.formData,
        dutyStartTime,
        dutyEndTime,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleChangeDutyTime = (value: any) => {
  state.formData.dutyStartTime = value[0];
  state.formData.dutyEndTime = value[1];
};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
