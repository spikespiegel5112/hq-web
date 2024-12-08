<template>
  <div class="dashboardright common_block_wrapper">
    <div class="header">
      <a-form>
        <a-row>
          <a-col :span="12"> </a-col>
          <a-col :span="12">
            <a-form-item label="区域">
              <a-select>
                <a-select-option value="全部">全部</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="content">
      <vue-scroll>
        <a-space wrap>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </a-space>
      </vue-scroll>
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

import { screenBannerInfoRequest } from "@/api/management";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({});

onMounted(async () => {});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.dashboardright {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 1.75rem);
  position: relative;
  // color: #fff;
  .content {
    height: calc(100vh - 2.8rem);
    overflow: auto;
    text-align: center;
    position: relative;
    :deep(.ant-space) {
      width: 100%;
      .ant-space-item {
        border: 1px solid #ccc;
        width: calc(50% - 5px);
        padding-top: 50%;
        > div {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
