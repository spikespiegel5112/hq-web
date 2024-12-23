<template>
  <div class="common_statuswithcolor_item">
    <div >
      {{ props.text }}
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
  text: { type: String, default: "", required: false },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const blockSize = computed(() => {
  return props.width + "-" + props.height;
}) as any;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_block_item {
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
}
</style>
