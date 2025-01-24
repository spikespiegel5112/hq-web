<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="9rem">
    <template #title>
      <CommonTitle :title="dialogTitle" />
    </template>
    <a-form
      :model="state.formData"
      ref="formDataRef"
      autocomplete="off"
      :rules="rules"
      :label-col="{ style: { width: '130px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="complaintRegion" label="投诉区域">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.complaintRegion"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$getDictionary('manageRegion')"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{ global.$getDictionary('manageRegion').find((item:any)=>item.value===state.formData.complaintRegion)?.label }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="complaintType" label="投诉类型">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.complaintType"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$getDictionary('complaintType')"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{ global.$getDictionary('complaintType' ).find((item:any)=>item.value==state.formData.complaintType)?.label }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- <a-row>
        <a-col :span="22">
          <a-form-item name="complaintSensitive" label="敏感程度">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.complaintSensitive"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$getDictionary('sensitivity')"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{ global.$getDictionary('sensitivity').find((item:any)=>item.value===state.formData.complaintSensitive)?.label }}
            </template>
          </a-form-item>
        </a-col>
      </a-row> -->
      <a-row>
        <a-col :span="22">
          <a-form-item name="complaintTime" label="投诉时间">
            <a-date-picker
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.complaintTime"
              format="YYYY-MM-DD HH:mm:ss"
              @change="handleChangeTime1"
              show-time
            ></a-date-picker>
            <template v-if="props.mode === 'review'">
              {{
                global
                  .$dayjs(state.formData.complaintTime)
                  .format("YYYY-MM-DD HH:mm:ss")
              }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="complaintContent" label="投诉内容">
            <a-textarea
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.complaintContent"
              placeholder="请输入"
              :rows="4"
            >
            </a-textarea>
            <template v-if="props.mode === 'review'">
              {{ state.formData.complaintContent }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="attachmentList" label="附件">
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
    attachmentList: [] as any[],
    complaintRegion: null,
    complaintType: null,
    complaintSensitive: null,
    complaintTime: null,
    complaintContent: null,
  } as any,
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
        let rowData = JSON.parse(JSON.stringify(props.rowData));
        rowData = {
          ...rowData,
          complaintTime: global.$dayjs(
            rowData.complaintTime,
            "YYYY-MM-DD HH:mm:ss"
          ),
        };
        console.log(state.formData);
        Object.keys(state.formData).forEach((item: string) => {
          state.formData[item] = rowData[item];
        });
      }
    }
  }
);

const handleClose = () => {
  formDataRef.value.resetFields();
  emit("onClose");
};

const handleSubmit = () => {
  formDataRef.value
    .validate()
    .then(() => {
      if (props.mode === "add") {
        state.formData.id = undefined;
      }
      const complaintTime = global
        .$dayjs(state.formData.complaintTime)
        .format("YYYY-MM-DD HH:mm:ss");
      emit("onSubmit", {
        ...state.formData,
        complaintTime,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleChangeTime1 = (value: any) => {
  if (!value) return;
};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
