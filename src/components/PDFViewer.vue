<template>
  <!-- http://10.125.60.80:9000/images/outinfo/WBXX-20240923001.pdf -->

  <div class="common_pdfviewer_wrapper"></div>
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
  defineEmits,
  nextTick,
} from 'vue';
import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import * as pdfjsLib from 'pdfjs-dist';

const pdfWorkerUrl = new URL(pdfWorker.default, import.meta.url).href;
const pdfWorkerUrl2 = pdfWorker.default;

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(pdfWorker.default, import.meta.url).href;

// import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
const props = defineProps({
  filePath: {
    type: String,
    default: '',
    required: false,
  },
});

const emit = defineEmits<{
  (e: 'onError', visible: boolean): void;
}>();

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const getPDF = async () => {
  // Loading a document.
  const loadingTask = pdfjsLib.getDocument(props.filePath);
  loadingTask.promise
    .then((pdfDocument: any) => {
      pdfDocument.getPage(1).then((pdfPage: any) => {
        initPDF(pdfPage);
      });
    })
    .catch((error: any) => {
      console.log(error);
      global.$message.error('该文件不存在');
      emit('onError', false);
    });
};

const initPDF = (pdfPage: any) => {
  // Display page on the existing canvas with 100% scale.
  const viewport = pdfPage.getViewport({ scale: 1.0 });
  const canvasElement = document.createElement('canvas');
  const pdfViewerElement = document.getElementsByClassName('common_pdfviewer_wrapper');

  canvasElement.width = viewport.width;
  canvasElement.height = viewport.height;
  const ctx = canvasElement.getContext('2d');

  pdfViewerElement[0].appendChild(canvasElement);
  const renderTask = pdfPage.render({
    canvasContext: ctx,
    viewport,
  });
  renderTask.promise.then(() => {}).catch((error: any) => {});
};

onMounted(async () => {
  console.log(props.filePath);
  console.log('=====pdfWorkerUrl=====');
  console.log(pdfWorkerUrl);
  console.log(pdfWorkerUrl2);
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
  min-height: 5rem;
  position: relative;
  text-align: center;
  transition: all 0.3s;
  canvas {
    width: 100%;
  }
}
</style>
