<template>
  <div class="common_title_item">
    <span class="title">{{ props.title }}</span>
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
    default: null,
    required: false,
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_title_item {
  display: flex;
  width: 100%;
  height: 0.25rem;
  position: relative;
  align-items: center;
  &:before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 100%;
    background-color: #0096ff;
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
