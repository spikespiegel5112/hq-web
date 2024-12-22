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
      <!-- temperature: "",
    warningType: "",
    weather: "",
    weatherId: "",
    weatherSource: "", -->

      <a-row>
        <a-col :span="22">
          <a-form-item name="externalType" label="类型">
            <a-select
              v-if="global.$checkEditable(props.mode)"
              v-model:value="state.formData.externalType"
              placeholder="请选择"
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
            <template v-if="props.mode === 'review'">
              {{ global.$getDictionary('external_info_external_type').find((item:any)=>item.value===state.formData.externalType)?.label }}
            </template>
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
            >
              <a-select-option
                v-for="item in global.$getDictionary(
                  'weather_warning_warning_level'
                )"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
            <template v-if="props.mode === 'review'">
              {{ global.$getDictionary('weather_warning_warning_level').find((item:any)=>item.value===state.formData.externalType)?.label }}
            </template>
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
              :rows="3"
            >
            </a-textarea>
            <template v-if="props.mode === 'review'">
              {{ state.formData.warningContent }}
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
  visible: false,
  formData: {
    id: null as number | null | undefined,
    dataTime: "",
    temperature: "",
    warningContent: "",
    warningLevel: "",
    warningType: "",
    weather: "",
    weatherId: "",
    weatherSource: "",
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
          dataTime: global.$dayjs(rowData.dataTime, "YYYY-MM-DD"),
        };
        Object.keys(state.formData).forEach((item: string) => {
          state.formData[item] = !!rowData[item] ? rowData[item] : undefined;
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
      const dataTime = global
        .$dayjs(props.rowData.dataTime)
        .format("YYYY-MM-DD HH:mm:ss");
      emit("onSubmit", {
        ...state.formData,
        dataTime:props.rowData.dataTime,
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
