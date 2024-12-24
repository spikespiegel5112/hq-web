<template>
  <a-modal v-model:open="state.visible" @cancel="handleClose" width="9rem">
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
      :label-col="{ style: { width: '130px' } }"
    >
      <a-row>
        <a-col :span="22">
          <a-form-item name="warningType" label="类型">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.warningType"
              placeholder="请选择"
              allow-clear
            >
              <a-select-option
                v-for="item in global.$getDictionary(
                  'weather_warning_warning_type_enum'
                )"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="warningLevel" label="级别">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.warningLevel"
              placeholder="请选择"
              allow-clear
            >
              <a-select-option
                v-for="item in global.$getDictionary('planLevel')"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="warningContent" label="内容">
            <a-textarea
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.warningContent"
              placeholder="请输入"
              :rows="5"
              allow-clear
            >
            </a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="22">
          <a-form-item name="attachmentList" label="附件">
            <CommonUpload :attachmentList="state.formData.attachmentList" />
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
} from "vue";

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
});

const state = reactive({
  visible: false,
  formData: {
    id: null as number | null | undefined,
    dataTime: null,
    temperature: null,
    warningContent: null,
    warningLevel: null,
    warningType: null,
    weather: null,
    weatherId: null,
    weatherSource: null,
    attachmentList: [] as any[],
  } as any,
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
      if (["edit", "review", "disposal"].some((item) => item === props.mode)) {
        let rowData = JSON.parse(JSON.stringify(props.rowData));
        rowData = {
          ...rowData,
          dataTime: global.$dayjs(rowData.dataTime, "YYYY-MM-DD HH:mm:ss"),
        };
        Object.keys(state.formData).forEach((item: string) => {
          state.formData[item] = global.$isNotEmpty(rowData[item])
            ? rowData[item]
            : undefined;
        });
        console.log(state.formData);
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
      emit("onSubmit", {
        ...state.formData,
        dataTime: props.rowData.dataTime,
        temperature: props.rowData.temperature,
        weather: props.rowData.weather,
        weatherId: props.rowData.weatherId,
        weatherSource: props.rowData.weatherSource,
      });
      handleClose();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const handleChangeTime1 = () => {};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss"></style>
