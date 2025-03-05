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
          <a-form-item name="publicSentimentType" label="舆情类型">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.publicSentimentType"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$getDictionary(
                  'public_sentiment_info_public_sentiment_type'
                )"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{ global.$getDictionary('public_sentiment_info_public_sentiment_type').find((item:any)=>item.value===state.formData.publicSentimentType)?.label }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="publicSentimentSource" label="舆情来源">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.publicSentimentSource"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in global.$getDictionary(
                  'public_sentiment_info_public_sentiment_source'
                )"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{
                parsePublicSentimentSource(state.formData.publicSentimentSource)
              }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="publicSentimentSensitive" label="敏感程度">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.publicSentimentSensitive"
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
              {{ global.$getDictionary('sensitivity').find((item:any)=>item.value===state.formData.publicSentimentSensitive)?.label }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="publicSentimentContent" label="舆情内容">
            <a-textarea
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.publicSentimentContent"
              placeholder="请输入"
              :rows="3"
              allow-clear
            >
            </a-textarea>
            <template v-if="props.mode === 'review'">
              {{ state.formData.publicSentimentContent }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="publicSentimentTime" label="舆情发生时间">
            <a-date-picker
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.publicSentimentTime"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
            ></a-date-picker>
            <template v-if="props.mode === 'review'">
              {{
                global
                  .$dayjs(state.formData.publicSentimentTime)
                  .format("YYYY-MM-DD HH:mm:ss")
              }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="22">
          <a-form-item name="keyword" label="关键词">
            <a-input
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.keyword"
              placeholder="请输入"
            >
            </a-input>
            <template v-if="props.mode === 'review'">
              {{ state.formData.keyword }}
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-if="props.mode === 'review'">
        <a-col :span="22">
          <a-form-item
            name="handlingStatus"
            label="状态"
            :style="{
              color: getDisposalStatusColor(state.formData.handlingStatus),
            }"
          >
            {{ global
            .$getDictionary("disposalStatus")
            .find((item2: any) => item2.value === state.formData.handlingStatus)?.label }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="handlingTime" label="处置时间">
            {{ state.formData.handlingTime }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="handlingContent" label="处置情况">
            {{ state.formData.handlingContent }}
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
      <a-row v-if="props.mode === 'review'">
        <a-col :span="22">
          <a-form-item name="handlingAttachmentList" label="处置附件">
            <AttachmentReview
              :attachmentList="state.formData.handlingAttachmentList"
            />
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
    keyword: null,
    publicSentimentContent: null,
    publicSentimentSensitive: null,
    publicSentimentSource: null,
    publicSentimentTime: null,
    publicSentimentType: null,
    handlingStatus: null,
    handlingTime: null,
    handlingContent: null,
    handlingAttachmentList: [] as any[],
  },
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
          publicSentimentTime: !!rowData.publicSentimentTime
            ? global.$dayjs(rowData.publicSentimentTime, "YYYY-MM-DD HH:mm:ss")
            : null,
        };
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
      const publicSentimentTime = global
        .$dayjs(state.formData.publicSentimentTime)
        .format("YYYY-MM-DD HH:mm:ss");
      emit("onSubmit", {
        ...state.formData,
        publicSentimentTime,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const getDisposalStatusColor = (value: any) => {
  const colorList = [
    {
      label: "绿色",
      color: "chartreuse",
      value: 2,
    },
    {
      label: "黄色",
      color: "yellow",
      value: 1,
    },
    {
      label: "红色",
      color: "red",
      value: 0,
    },
  ];

  return global.$getColorInfoByValue(value, colorList)?.color;
};

const parsePublicSentimentSource = (value: any) => {
  let result = global
    .$getDictionary("public_sentiment_info_public_sentiment_source")
    .find((item: any) => value === state.formData.publicSentimentSource);
  return !!result ? result.label : result.value;
};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
