<template>
  <!-- http://10.125.60.80:9000/images/outinfo/WBXX-20240923001.pdf -->

  <div class="common_videoplayer_wrapper">
    <video
      :src="global.$store.state.app.videoPlayerFilePath"
      controls
      autoplay
    ></video>
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
  defineEmits,
  nextTick,
} from 'vue';

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

onMounted(async () => {
  console.log(props.filePath);
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
.common_videoplayer_wrapper {
  display: block;
  width: 100%;
  position: relative;
  text-align: center;
  video {
    width: 100%;
  }
}
</style>
