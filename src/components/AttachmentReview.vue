<template>
  <div class="common_attachmentreview_item">
    <a-upload
      v-model:file-list="state.attachmentList"
      list-type="picture-card"
      :showUploadList="{
        showPreviewIcon: true,
        showRemoveIcon: false,
        showDownloadIcon: true,
      }"
      @preview="handlePreview"
      @download="handleDownload"
    >
      <template #slot:itemRender> </template>
      <!-- http://localhost:9009/manage/attachment/download?id=191 -->
    </a-upload>
    <a-image
      style="display: none"
      :width="100"
      :height="100"
      :src="`${global.$getBaseUrl()}/attachment/download?id=${state.currentAttachmentData.id}`"
      :preview="{
        visible: state.previewVisible,
        onVisibleChange: () => (state.previewVisible = false),
      }"
    />
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

const props = defineProps({
  title: {
    type: String,
    default: null,
    required: false,
  },
  attachmentList: { type: Array, required: true, default: () => [] as any[] },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  attachmentList: [] as any[],
  previewVisible: false,
  attachmentType: null,
  currentAttachmentData: {},
});

watch(
  () => props.attachmentList,
  (newVal) => {
    parseAttachmentList();
  },
  {
    deep: true,
  }
);

const handlePreview = (value: any) => {
  state.previewVisible = true;
  state.currentAttachmentData = value;
};

const handleDownload = (value: any) => {
  location.href = value.attachmentPath;
};

const parseAttachmentList = () => {
  state.attachmentList = props.attachmentList.map(
    (item: any, index: number) => {
      const fileType = global.$checkFileType(item.attachmentName);
      let previewImagePath = "";
      switch (fileType) {
        case "file":
          previewImagePath = global.$getImageUrl("/src/assets/file_icon.png");
          break;
        case "video":
          previewImagePath = global.$getImageUrl("@/assets/file_icon.png");
          break;
        default:
          previewImagePath = checkUniViewImage(item);
          break;
      }

      return {
        ...item,
        uid: index,
        name: item.attachemtnName,
        status: "done",
        url: previewImagePath,
      };
    }
  );
};

const checkUniViewImage = (item: any) => {
  let result: string;
  const baseUrl =
    global.$store.state.app.envMode.MODE === "test"
      ? "http://localhost:9009/manage"
      : "";
  if (item.createBy === "uniview") {
    result = item.attachmentPath;
  } else {
    result = `${global.$getBaseUrl()}/attachment/download?id=${item.id}`;
  }
  return result;
};

onMounted(() => {
  parseAttachmentList();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_attachmentreview_item {
  display: flex;
  position: relative;
  align-items: center;

  .title {
    display: inline-block;
    margin: 0 0 0 0.1rem;
    font-size: 0.25rem;
    color: #fff;
    line-height: 0.5rem;
  }
}
</style>
