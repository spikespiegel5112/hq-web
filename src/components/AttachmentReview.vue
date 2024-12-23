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
    >
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

// const attachmentList = computed(() => {
//   return props.attachmentList.map((item: any, index: number) => {
//     return {
//       ...item,
//       uid: index,
//       name: item.attachemtnName,
//       status: "done",
//       url: `${global.$getBaseUrl()}/attachment/download?id=${item.id}`,
//     };
//   });
// });

const state = reactive({
  attachmentList: [] as any[],
  previewVisible: false,
  attachmentType: "",
  currentAttachmentData: {},
});

const checkFileType = (file: any) => {
  console.log(file);
  let result = "";
  const attachmentName = file.attachmentName;
  const fileType = attachmentName.split(".")[1];

  const imageType = ["png", "jpg", "jpeg", "gif", "bmp"];
  if (imageType.includes(fileType)) {
    result = "image";
  }

  return result;
};

const handlePreview = (value: any) => {
  console.log(value);
  state.previewVisible = true;
  state.currentAttachmentData = value;
};

onMounted(() => {
  state.attachmentList = props.attachmentList.map(
    (item: any, index: number) => {
      return {
        ...item,
        uid: index,
        name: item.attachemtnName,
        status: "done",
        url: `${global.$getBaseUrl()}/attachment/download?id=${item.id}`,
      };
    }
  );
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
