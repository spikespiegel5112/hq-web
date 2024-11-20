<template>
  <div class="common_title_item">
    <span class="bg"></span>
    <span class="title">{{ title }}</span>
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
    default: '',
    required: false,
  }
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_title_item {
  display: inline-block;
  width: 5rem;
  height: 0.5rem;
  position: relative;
  .bg {
    display: inline-block;
    width: 1.6rem;
    height: 0.7rem;
    background-image: url('@/assets/title@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
  }

  .title {
    margin: 0 0 0 0.1rem;
    font-size: 0.25rem;
    color: #fff;
    line-height: 0.5rem;
  }


}
</style>
