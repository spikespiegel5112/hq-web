<template>
  <div class="common_block_item">
    <div v-if="title !== ''" class="header">
      <div class="title">{{ title }}</div>
    </div>
    <slot></slot>
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
  title: { type: String, default: null, required: false },
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
    width: 100%;
    height: 0.3rem;

    .title {
      padding: 0.03rem 0.1rem;
      height: 100%;
      text-shadow: 0.01rem 0.01rem 0.01rem #000;
      font-size: 0.22rem;
      background-image: linear-gradient(
        to right,
        rgba(68, 121, 255, 1) 0,
        rgba(68, 121, 255, 0) 2rem
      );
    }
  }
}
</style>
