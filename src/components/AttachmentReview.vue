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
      <template #itemRender="{ file, actions }">
        <div class="filelist_wrapper">
          <div v-if="global.$checkFileType(file.attachmentName) === 'image'">
            <a-image width="1rem" height="1rem" :src="getImgUrl(file)" />
            <a-button
              v-if="!checkUniView(file)"
              class="deletebutton"
              type="link"
              @click="actions.remove"
            >
              <DeleteOutlined />
            </a-button>
          </div>
          <div
            v-else-if="global.$checkFileType(file.attachmentName) === 'file'"
          >
            <FileOutlined />
            <a-button class="deletebutton" type="link" @click="actions.remove">
              <DeleteOutlined />
            </a-button>
          </div>
          <div v-else-if="global.$checkFileType(file.attachmentName) === 'pdf'">
            <FilePdfOutlined @click="handlePreviewPdf(file)" />
            <a-button class="deletebutton" type="link" @click="actions.remove">
              <DeleteOutlined />
            </a-button>
          </div>
          <div
            v-else-if="global.$checkFileType(file.attachmentName) === 'video'"
          >
            <VideoCameraOutlined @click="handlePreviewVideo(file)" />
            <a-button
              v-if="!checkUniView(file)"
              class="deletebutton"
              type="link"
              @click="actions.remove"
            >
              <DeleteOutlined />
            </a-button>
          </div>
        </div>
      </template>
    </a-upload>
    <AttachmentPreview
      :visible="state.attachmentVisible"
      :fileType="state.attachmentType"
      :attachmentList="[state.currentAttachmentData]"
      @onClose="state.attachmentVisible = false"
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
import {
  UploadOutlined,
  DeleteOutlined,
  FileOutlined,
  VideoCameraOutlined,
  FilePdfOutlined,
} from "@ant-design/icons-vue";

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
  attachmentType: "",
  attachmentVisible: false,
  currentAttachmentData: {},
  pdfViewerVisible: false,
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
  state.attachmentVisible = true;
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

      console.log(previewImagePath);

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
  if (item.createBy === "uniview") {
    result = item.attachmentPath;
  } else {
    result = `${global.$getFileBaseUrl()}/attachment/download?id=${item.id}`;
  }
  return result;
};

const getImgUrl = (item: any) => {
  if (item.directLocation) {
    return item.attachmentName;
  } else {
    return checkUniViewImage(item);
  }
};

const checkUniView = (item: any) => {
  return item.createBy === "uniview";
};

const handlePreviewPdf = (file: any) => {
  state.currentAttachmentData = file;
  state.attachmentVisible = true;
  state.attachmentType = "pdf";
};

const handlePreviewVideo = (file: any) => {
  state.currentAttachmentData = file;
  state.attachmentVisible = true;
  state.attachmentType = "video";
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
  :deep(.ant-upload-list) {
    margin: 0.15rem 0 0 0;
    .ant-upload-list-item-container {
      display: inline-block;
      margin: 0 0.1rem 0 0;
      width: auto !important;
      height: auto !important;

      .filelist_wrapper {
        width: 1rem;
        height: 1rem;
        > div {
          display: inline-flex;
          width: 100%;
          height: 100%;
          position: relative;
          align-items: center;
          justify-content: center;
          border: 1px solid #00266f;
          border-radius: 0.1rem;
          overflow: hidden;
          &:hover {
            border: 1px solid #0059ff;
            transition: 0.3s all;
          }
          .anticon-file,
          .anticon-video-camera,
          .anticon-file-pdf {
            font-size: 0.5rem;
          }
          .deletebutton {
            height: 20px;
            padding: 0;
            position: absolute;
            right: 0;
            top: 0;
            .anticon {
              font-size: 0.2rem;
            }
          }
        }
      }
    }
  }
}
</style>
