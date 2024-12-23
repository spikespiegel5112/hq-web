<template>
  <div class="common_attachmentreview_item">
    <div v-for="item in props.attachmentList">
      <a-image
        v-if="checkFileType(item) === 'image'"
        :width="100"
        :height="100"
        :src="`${global.$getBaseUrl()}/attachment/download?id=${item.id}`"
      />
    </div>
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
    default: "",
    required: false,
  },
  attachmentList: { type: Array, required: true, default: () => [] as any[] },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_attachmentreview_item {
  display: flex;

  position: relative;
  align-items: center;
  &:before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 100%;
    background-color: #fff;
  }

  .title {
    display: inline-block;
    margin: 0 0 0 0.1rem;
    font-size: 0.25rem;
    color: #fff;
    line-height: 0.5rem;
  }
}
</style>
