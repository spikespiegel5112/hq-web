<template>
  <a-modal
    class="common_attachmentpreview_wrapper"
    v-model:open="state.visible"
    @cancel="handleClose"
    width="9rem"
  >
    <!-- Slider main container -->
    <div class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div
          v-for="item in props.attachmentList"
          class="swiper-slide"
          :style="{
            textAlign: 'center',
          }"
        >
          <img v-if="props.fileType === 'image'" :src="getImgUrl(item)" />
          <PDFViewer
            v-if="props.fileType === 'file'"
            :filePath="getImgUrl(item)"
          />
        </div>
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar"></div>
    </div>
  </a-modal>
</template>

<script lang="tsx" setup>
import {
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ComponentInternalInstance,
  ref,
  nextTick,
} from "vue";

// import Swiper JS
// core version + navigation, pagination modules:
import Swiper from "swiper/bundle";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { CloseOutlined, CloseCircleFilled } from "@ant-design/icons-vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const emit = defineEmits<{
  (e: "onClose", rowData: any): void;
}>();

const props = defineProps({
  attachmentList: { type: Array, required: true, default: () => [] },
  visible: { type: Boolean, required: true, default: false },
  fileType: { type: String, default: "", required: true },
});

const state = reactive({
  visible: false,
  attachmentList: [] as any[],
});

watch(
  () => props.visible,
  async (newValue: any) => {
    state.visible = newValue;
  }
);

watch(
  () => props.attachmentList,
  (newValue: any, oldValue: any) => {
    if (props.fileType === "image") {
      initSwiper();
    }
  }
);

watch(
  () => global.$route,
  (newValue: any, oldValue: any) => {}
);

const getImgUrl = (item: any) => {
  return `${global.$getBaseUrl()}/attachment/download?id=${item.id}`;
};

const handleClose = () => {
  emit("onClose");
};

const initSwiper = async () => {
  await nextTick();
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    loop: true,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
};

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.common_accesslog_wrapper {
  display: flex;
  margin: 0.15rem 0 0 0;
  padding: 0 0.2rem;
  width: 100%;
  height: 0.5rem;
  align-items: center;
  .ant-space {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    .route {
      padding: 0 0.1rem 0 0;
      border: 1px solid #333;
      transition: 0.3s all;

      &.active {
        background-color: #0062ff;
        .title {
          color: #fff;
        }
      }
      &:hover {
        border: 1px solid #666;
        .title {
          color: #fff;
        }
      }
      .title {
        display: inline-block;
        padding: 0.1rem;
        color: #ccc;
      }
      .close {
        display: inline-block;
        padding: 0.03rem;
        color: #fff;
        border-radius: 50%;
        font-size: 0.15rem;
        &:hover {
          background-color: #ccc;
          color: #333;
          &.idle {
            display: none;
          }
          &.hover {
            display: inline-block;
          }
        }
      }
      .idle {
        display: inline-block;
      }
      .hover {
        display: none;
      }
    }
  }
}
.swiper {
  width: 600px;
  height: 600px;
}
</style>
