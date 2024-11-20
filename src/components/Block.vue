<template>
  <div
    class="common_block_item"
    :class="[side, blockSize, cornor]"
  >
    <div
      v-if="title !== ''"
      class="header"
    >
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
} from 'vue';

const props = defineProps({
  side: {
    type: String,
    default: 'left',
    required: true,
  },
  text: {
    type: String,
    default: '',
    required: false,
  },
  width: {
    type: String,
    default: 'narrow',
    required: false,
  },
  height: {
    type: String,
    default: 'short',
    required: false,
  },
  cornor: {
    type: Boolean,
    default: true,
    required: false,
  },
  title: {
    type: String,
    default: '',
    required: false,
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const blockSize = computed(() => {
  return props.width + '-' + props.height;
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

  &.left {
    &.wide-short {
      width: 15.65rem;
      height: 5.1rem;
      background-image: url('@/assets/block-left-wide-short@2x.png');

      .cornor {
        &:before {
          left: 0.04rem;
          bottom: 0.14rem;
        }

        &:after {
          right: 0.05rem;
          bottom: 0.14rem;
        }
      }
    }

    &.narrow-short {
      width: 7.81rem;
      height: 5rem;
      background-image: url('@/assets/block-left-narrow-short@2x.png');

      .cornor {
        &:before {
          left: 0.04rem;
          bottom: 0.05rem;
        }

        &:after {
          right: 0.05rem;
          bottom: 0.05rem;
        }
      }
    }

    &.narrow-medium {
      width: 7.8rem;
      height: 9.1rem;
      background-image: url('@/assets/block-left-narrow-medium@2x.png');

      .cornor {
        &:before {
          left: 0.04rem;
          bottom: 0.12rem;
        }

        &:after {
          right: 0.05rem;
          bottom: 0.12rem;
        }
      }
    }

    &.wide-long {
      width: 15.65rem;
      height: 11.3rem;
      background-image: url('@/assets/block-left-wide-long@2x.png');

      .cornor {
        &:before {
          left: 0.04rem;
          bottom: 0.09rem;
        }

        &:after {
          right: 0.05rem;
          bottom: 0.09rem;
        }
      }
    }

    &.narrow-long {
      width: 7.8rem;
      height: 11.3rem;
      background-image: url('@/assets/block-left-narrow-long@2x.png');

      .cornor {
        &:before {
          left: 0.04rem;
          bottom: 0.09rem;
        }

        &:after {
          right: 0.05rem;
          bottom: 0.09rem;
        }
      }
    }
  }

  &.right {
    &.medium-row1 {
      width: 11.7rem;
      height: 6.1rem;
      background-image: url('@/assets/block-right-medium-row1@2x.png');

      .cornor {
        &:before {
          left: 0.04rem;
          bottom: 0.03rem;
        }

        &:after {
          right: 0.05rem;
          bottom: 0.03rem;
        }
      }
    }

    &.medium-row2 {
      width: 11.7rem;
      height: 6.65rem;
      background-image: url('@/assets/block-right-medium-row2@2x.png');

      .cornor {
        &:before {
          left: 0.04rem;
          bottom: 0.05rem;
        }

        &:after {
          right: 0.05rem;
          bottom: 0.05rem;
        }
      }
    }

    &.medium-row3 {
      width: 11.7rem;
      height: 5.6rem;
      background-image: url('@/assets/block-right-medium-row3@2x.png');

      .cornor {
        &:before {
          left: 0.04rem;
          bottom: 0.03rem;
        }

        &:after {
          right: 0.05rem;
          bottom: 0.03rem;
        }
      }
    }

    &.medium-row4 {
      width: 11.7rem;
      height: 7.1rem;
      background-image: url('@/assets/block-right-medium-row4@2x.png');

      .cornor {
        &:before {
          left: 0.04rem;
          bottom: 0.03rem;
        }

        &:after {
          right: 0.05rem;
          bottom: 0.03rem;
        }
      }
    }
  }

  &.middle {
    width: 16rem;
    height: 4.6rem;
    background-image: url('@/assets/block-middle@2x.png');
  }

  .header {
    width: 100%;
    height: 0.7rem;
    background-image: url('@/assets/title-bg@2x.png');
    background-size: 3rem;
    background-repeat: no-repeat;
    background-position: center 0rem;
    text-align: center;
    color: #fff;
    overflow: hidden;

    .title {
      margin: 0.22rem 0 0 0;
      font-size: 0.26rem;
      font-weight: bold;
    }
  }

  .cornor {
    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-color: transparent transparent #00ffff #00ffff;
      border-width: 0.07rem;
    }

    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-color: transparent #00ffff #00ffff transparent;
      border-width: 0.07rem;
    }
  }
}
</style>
