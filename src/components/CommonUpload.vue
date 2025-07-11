<template>
  <div class="common_upload_item">
    <a-upload
      v-if="global.$checkEditable(props.mode)"
      v-model:file-list="state.fileList"
      name="file"
      :list-type="listType"
      :action="`${global.$getFileBaseUrl()}/attachment/upload`"
      :headers="{}"
      :disabled="props.disabled"
      :showUploadList="{
        showDownloadIcon: false,
      }"
      @change="handleChangeAttachment"
      @remove="handleDeleteAttachment"
    >
      <a-button type="primary">
        <upload-outlined></upload-outlined>
        上传
      </a-button>
      <template #itemRender="{ file, actions }">
        <div v-if="file.status === 'uploading'" class="loading">
          <LoadingOutlined />
        </div>
        <div v-else class="filelist_wrapper">
          <div v-if="global.$checkFileType(file.name) === 'image'">
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
          <div v-else-if="global.$checkFileType(file.name) === 'file'">
            <FileOutlined />
            <a-button class="deletebutton" type="link" @click="actions.remove">
              <DeleteOutlined />
            </a-button>
          </div>
          <div v-else-if="global.$checkFileType(file.name) === 'pdf'">
            <FilePdfOutlined />
            <a-button class="deletebutton" type="link" @click="actions.remove">
              <DeleteOutlined />
            </a-button>
          </div>
          <div v-else-if="global.$checkFileType(file.name) === 'video'">
            <VideoCameraOutlined />
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

import { LoadingOutlined } from "@ant-design/icons-vue";
import { attachmentDeleteRequest } from "@/api/management";

const emit: any = defineEmits(["update:attachmentList"]);

const props = defineProps({
  mode: { type: String, default: "edit", required: false },
  title: { type: String, default: null, required: false },
  attachmentList: { type: [Array, String, null], default: [] },
  disabled: { type: Boolean, default: false },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  fileList: [] as any[],
  initFlag: true,
  uploadingFlag: false,
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
    if (newValue instanceof Array && oldValue instanceof Array) {
      if (oldValue.length > 0 && newValue.length === 0) {
        state.fileList = [];
        state.initFlag = true;
      } else if (newValue.length > 0 && !!state.initFlag) {
        initFileList();
      }
    }
  },
  {
    deep: true,
  }
);

const checkUniView = (item: any) => {
  return item.createBy === "uniview";
};

const getImgUrl = (item: any) => {
  if (item.directLocation) {
    return item.attachmentName;
  } else {
    return checkUniViewImage(item);
  }
};

const checkFileUrl = (item: any) => {
  let result: string;
  if (checkUniView(item)) {
    result = item.attachmentPath;
  } else {
    const fileType = global.$checkFileType(item.attachmentName);

    switch (fileType) {
      case "file":
        result = global.$getImageUrl("/src/assets/file_icon.png");
        break;
      case "video":
        result = global.$getImageUrl("/src/assets/file_icon.png");
        break;
      default:
        result = `${global.$getFileBaseUrl()}/attachment/download?id=${item.id}`;
        break;
    }
  }
  return result;
};

const checkUniViewImage = (item: any) => {
  const fileData =
    !!item.response && !!item.response.data ? item.response.data : item;
  let result: string;
  if (item.createBy === "uniview") {
    result = fileData.attachmentPath;
  } else {
    result = `${global.$getFileBaseUrl()}/attachment/download?id=${fileData.id}`;
  }

  return result;
};

const handleChangeAttachment = (value: any) => {
  if (value.file.response) {
    const response: any = value.file.response;

    if (response.code === 0) {
      if (!(_modelValue.value instanceof Array)) {
        _modelValue.value = JSON.parse(JSON.stringify([]));
      }
      const fileIndex =
        state.fileList.length > 0 ? state.fileList.length - 1 : 0;
      state.fileList[fileIndex] = {
        ...state.fileList[fileIndex],
        ...response.data,
      };
      const fileInfo = {
        ...state.fileList[fileIndex],
        id: state.fileList[fileIndex].id,
        uid: fileIndex,
        name: state.fileList[fileIndex].attachmentName,
        status: "done",
        deleteAble: !checkUniView(state.fileList[fileIndex]),
        url: checkFileUrl(state.fileList[fileIndex]),
      };
      console.log(fileInfo);
      _modelValue.value.push(fileInfo);
      global.$message.success("上传成功");
    } else {
      global.$message.error("上传失败");
    }
  }
};

const handleDeleteAttachment = (value: any) => {
  if (!value.deleteAble && value.deleteAble !== undefined) {
    global.$message.error("系统文件，无法删除");
    return;
  }
  let sliceIndex: number = 0;

  _modelValue.value.forEach((item: any, index: number) => {
    if (item.attachmentPath === value.attachmentPath) {
      sliceIndex = index;
    }
  });

  attachmentDeleteRequest({
    id: value.id,
  })
    .then((res: any) => {
      _modelValue.value.splice(sliceIndex, 1);
      global.$message.success("删除成功");
    })
    .catch((err: any) => {
      global.$message.error("删除失败");
    });
};

const initFileList = () => {
  state.fileList = [];
  _modelValue.value.forEach((item: any, index: number) => {
    state.fileList.push({
      ...item,
      id: item.id,
      uid: index,
      name: item.attachmentName,
      status: "done",
      deleteAble: !checkUniView(item),
      url: checkFileUrl(item),
    });
  });
  state.initFlag = false;
};

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    // initFileList();
  }, 500);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_upload_item {
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
  :deep(.ant-upload-list) {
    margin: 0.15rem 0 0 0;
    .ant-upload-list-item-container {
      display: inline-block;
      margin: 0 0.1rem 0 0;
      height: auto !important;
      border: 1px solid #00266f;
      border-radius: 0.1rem;
      &:hover {
        border: 1px solid #0059ff;
        transition: 0.3s all;
      }
      .loading {
        display: flex;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        justify-content: center;
        font-size: 0.5rem;
      }
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
