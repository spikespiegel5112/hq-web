<template>
  <div class="common_pdfviewer_wrapper" :id="state.pdfId">
    <div class="main"></div>
    <div class="navigator">
      <a-button @click="handlePrevPage">上一页</a-button>
      <a-button @click="handleNextPage">下一页</a-button>
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
import * as pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import * as pdfjsLib from "pdfjs-dist";

const pdfWorkerUrl = new URL(pdfWorker.default, import.meta.url).href;
const pdfWorkerUrl2 = pdfWorker.default;

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  pdfWorker.default,
  import.meta.url
).href;

// import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
const props = defineProps({
  filePath: {
    type: String,
    default: "",
    required: false,
  },
});

const emit = defineEmits<{
  (e: "onError", visible: boolean): void;
}>();
const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

let pdfDocument: any;
let ctx: any;
let canvasElement: any;

const state = reactive({
  currentPage: 1,
  totalPages: 0,
  pdfId: "",
});

const getPDF = async () => {
  // Loading a document.
  let loadingTask = pdfjsLib
    .getDocument(props.filePath)
    .promise.then((doc: any) => {
      pdfDocument = doc;
      state.totalPages = doc.numPages; // 获取总页数
      initPDF();
      renderPage(state.currentPage); // 渲染第一页
    });
};

const initPDF = async () => {
  state.pdfId = "pdf" + global.$generateUUID();
  await nextTick();
  // Display page on the existing canvas with 100% scale.
  canvasElement = document.createElement("canvas");
  // const canvasElement = document.querySelector('#pdfcanvas');
  const pdfViewerElement: any = document.querySelector(`#${state.pdfId} .main`);

  canvasElement.style.objectFit = "contain";
  canvasElement.style.maxWidth = "100%";
  canvasElement.style.maxHeight = "100%";
  ctx = canvasElement.getContext("2d");
  pdfViewerElement.appendChild(canvasElement);
};

const setPDFSize = (pdfPage: any) => {
  // Display page on the existing canvas with 100% scale.
  const viewport = pdfPage.getViewport({ scale: 1.0 });
  canvasElement.width = viewport.width;
  canvasElement.height = viewport.height;
};

const renderPage = (pageNumber: number) => {
  pdfDocument.getPage(pageNumber).then((pdfPage: any) => {
    setPDFSize(pdfPage);
    const viewport = pdfPage.getViewport({ scale: 1.5 }); // 缩放比例
    canvasElement.width = viewport.width;
    canvasElement.height = viewport.height;
    pdfPage
      .render({
        canvasContext: ctx,
        viewport: viewport,
      })
      .promise.then((doc: any) => {
        // pageInfo.textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;
      });
  });
};

const handlePrevPage = () => {
  state.currentPage = state.currentPage === 0 ? 0 : state.currentPage - 1;
  renderPage(state.currentPage);
};

const handleNextPage = () => {
  state.currentPage =
    state.currentPage < state.totalPages
      ? state.currentPage + 1
      : state.totalPages;
  renderPage(state.currentPage);
};

onMounted(async () => {
  state.pdfId = global.$generateUUID();
  getPDF();
});

onBeforeUnmount(() => {
  console.log(props.filePath);
});

watch(
  () => props.filePath,
  (newValue: any, oldValue: any) => {}
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_pdfviewer_wrapper {
  display: block;
  // width: 100%;
  height: 100%;
  min-height: 5rem;
  position: relative;
  text-align: center;
  transition: all 0.3s;
  .main {
    display: flex;
    width: 100%;
    height: calc(100% - 1rem);
    align-items: center;
    justify-content: center;
    position: relative;
    canvas {
      object-fit: contain;
      max-width: 100%; /* 宽度不能超过父级 */
      max-height: 100%; /* 高度不能超过父级 */
    }
  }
  .navigator {
    padding: 0.3rem 0 0 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
