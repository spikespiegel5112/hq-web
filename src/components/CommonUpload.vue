<template>
  <div class="common_upload_item">
    <a-upload
      v-if="global.$checkEditable(props.mode)"
      v-model:file-list="state.fileList"
      name="file"
      :list-type="listType"
      action="/api/manage/attachment/upload"
      :headers="{}"
      :disabled="props.disabled"
      @change="handleChangeAttachment"
      @remove="handleDeleteAttachment"
    >
      <a-button type="primary">
        <upload-outlined></upload-outlined>
        上传
      </a-button>
    </a-upload>
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
  defineEmits,
} from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";

import { attachmentDeleteRequest } from "@/api/management";

const emit: any = defineEmits(["update:attachmentList"]);

const props = defineProps({
  mode: { type: String, default: "edit", required: false },
  title: { type: String, default: null, required: false },
  attachmentList: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  fileList: [] as any[],
});

const _modelValue = computed({
  get: () => {
    return props.attachmentList;
  },
  set: (val) => {
    emit("update:attachmentList", val);
  },
});

const listType = computed(() => {
  if (props.mode === "review") {
    return "picture-card";
  } else {
    return undefined;
  }
});

watch(
  () => props.attachmentList,
  (newValue: any, oldValue: any) => {
    state.fileList = [];
    const baseUrl =
      global.$store.state.app.envMode.MODE === "test"
        ? "http://localhost:9009/manage"
        : "";

    newValue.forEach((item: any, index: number) => {
      state.fileList.push({
        id: item.id,
        uid: index,
        name: item.attachmentName,
        status: "done",
        url: `${baseUrl}/attachment/download?id=${item.id}`,
      });
    });
  },
  {
    deep: true,
  }
);

const handleChangeAttachment = (value: any) => {
  if (value.file.response) {
    const response: any = value.file.response;
    if (response.code === 0) {
      if (!Array.isArray(_modelValue.value)) {
        _modelValue.value = [];
      }
      _modelValue.value.push(response.data);
      global.$message.success("上传成功");
    } else {
      global.$message.error("上传失败");
    }
  }
};

const handleDeleteAttachment = (value: any) => {
  let sliceIndex: number = 0;

  props.attachmentList.forEach((item: any, index: number) => {
    if (item.attachmentPath === value.url) {
      sliceIndex = index;
    }
  });

  props.attachmentList.splice(sliceIndex, 1);
  attachmentDeleteRequest({
    id: value.id,
  })
    .then((res: any) => {
      global.$message.success("删除成功");
    })
    .catch((err: any) => {
      global.$message.error("删除失败");
    });
};

const initFileList = () => {
  state.fileList = [];
  props.attachmentList.forEach((item: any, index: number) => {
    state.fileList.push({
      uid: index,
      name: item.attachmentName,
      status: "done",
      url: item.attachmentPath,
    });
  });
};

onMounted(() => {
  initFileList();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_block_item {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  text-align: left;
  position: relative;
  .header {
    padding: 0.03rem 0.1rem;
    width: 100%;
    height: 0.3rem;
    font-size: 0.22rem;
    text-shadow: 0.01rem 0.01rem 0.01rem #000;
    background-image: linear-gradient(
      to right,
      rgba(68, 121, 255, 1),
      rgba(68, 121, 255, 0)
    );
  }
}
</style>
