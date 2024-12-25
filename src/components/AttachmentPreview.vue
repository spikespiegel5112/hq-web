<template>
  <a-modal
    class="common_attachmentpreview_wrapper"
    v-model:open="state.visible"
    @cancel="handleClose"
    width="9rem"
  >
    <!-- {{ props.attachmentList }} -->
    <a-carousel
      v-if="props.type === 'image'"
      arrows
      dots-class="slick-dots slick-thumb"
    >

      <template #customPaging="props">
        {{ props }}
        <!-- <img :src="getImgUrl(props)" /> -->
      </template>
      <div v-for="item in props.attachmentList" :key="item">
      {{ getImgUrl(item) }}

        <img :src="getImgUrl(item)" />
      </div>
    </a-carousel>
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
import { CloseOutlined, CloseCircleFilled } from "@ant-design/icons-vue";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();

const props = defineProps({
  attachmentList: { type: Array, required: true, default: () => [] },
  visible: { type: Boolean, required: true, default: false },
  type: { type: String, default: "", required: true },
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
  () => global.$route,
  (newValue: any, oldValue: any) => {}
);

const getImgUrl = (item: any) => {
  debugger
  return `${global.$getBaseUrl()}/attachment/download?id=${item.id}`;
};

const handleClose = () => {};

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
</style>
