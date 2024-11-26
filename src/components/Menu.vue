<template>
  <div class="common_menu_wrapper" :class="[side, blockSize, cornor]">
    <div v-if="title !== ''" class="header">
      <div class="title">{{ title }}</div>
    </div>
    <slot></slot>
    <div class="cornor"></div>
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
  side: {
    type: String,
    default: "left",
    required: true,
  },
  text: {
    type: String,
    default: "",
    required: false,
  },
  width: {
    type: String,
    default: "narrow",
    required: false,
  },
  height: {
    type: String,
    default: "short",
    required: false,
  },
  cornor: {
    type: Boolean,
    default: true,
    required: false,
  },
  title: {
    type: String,
    default: "",
    required: false,
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const blockSize = computed(() => {
  return props.width + "-" + props.height;
}) as any;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_menu_wrapper {
  
}
</style>
