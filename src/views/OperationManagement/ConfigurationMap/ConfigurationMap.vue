<template>
  <div class="mapconfigration">
    <iframe class="content" :src="iframeUrl" frameborder="0"></iframe>
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
import type { Rule } from "ant-design-vue/es/form";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  visible: false,
  formData: {},
});

const iframeUrl = computed(() => {
  return `http://10.141.10.13/#/?shareLogin&GNKh3QOOIeEbZ0goH7xWu1D67svaWIorQYwwk4JuYztmRG+8m7sEEyMsJA4bFzkExcYMlFSFsrcuMNZKkzQfR7o3aEAyeht9lt4yi7b08iE=&title=${document.title}&offset=[100,100]`;
});

const getData = () => {
  global.$store.commit("app/updateTableLoading", true);
};

const handleSubmit = () => {};

onMounted(async () => {
  getData();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.mapconfigration {
  margin: 0.1rem;
  padding: 0.3rem;
  background-color: #010f27;

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 2.3rem);
    position: relative;
    overflow: hidden;
    box-shadow: 50px 50px 100px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
    pointer-events: visible;

    .main {
      display: flex;
      padding: 1.45rem 0 0 0;
      width: 100%;
      justify-content: space-between;
      position: relative;

      .middle {
        margin: 1rem 0 0 0;
        z-index: 2;
      }

      .right {
        z-index: 1;
        // margin: 0 0.6rem 0 0;
      }
    }
  }
}
</style>
