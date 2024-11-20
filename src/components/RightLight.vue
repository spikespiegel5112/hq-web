<template>
  <div
    class="common_rightlight_wrapper"
    :style="{
      textAlign: props.align,
    }"
  >
    <ul>
      <li
        class="green"
        :class="{ off: props.green === 0 }"
      >
        <img
          src="@/assets/light-small-green@2x.png"
          alt=""
        />
        <span>{{ props.green }}/{{ props.total }}</span>
      </li>
      <li
        class="yellow"
        :class="{ off: props.yellow === 0 }"
      >
        <img
          src="@/assets/light-small-yellow@2x.png"
          alt=""
        />
        <span>{{ props.yellow }}/{{ props.total }}</span>
      </li>
      <li
        class="red"
        :class="{ off: props.red === 0 }"
      >
        <img
          src="@/assets/light-small-red@2x.png"
          alt=""
        />
        <span>{{ props.red }}/{{ props.total }}</span>
      </li>
    </ul>
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
  align: {
    type: String,
    default: 'left',
    required: false,
  },
  total: {
    type: Number,
    default: 0,
    required: false,
  },
  red: {
    type: Number,
    default: 0,
    required: false,
  },
  yellow: {
    type: Number,
    default: 0,
    required: false,
  },
  green: {
    type: Number,
    default: 0,
    required: false,
  },
});

const alignStyle = computed(() => {
  return {
    textAlign: props.align,
  };
}) as any;

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_rightlight_wrapper {
  display: block;
  width: 100%;
  height: 1rem;
  position: relative;
  font-family: 'ZhenyanGB-Regular';

  ul {
    display: inline-flex;
    width: 3.5rem;
    height: 100%;
    justify-content: space-around;

    li {
      display: inline-block;
      flex: 1;
      text-align: center;

      &.off {
        img {
          opacity: 0.3;
        }

        span {
          opacity: 0.3;
        }
      }

      img {
        display: block;
        margin: 0 auto 0.05rem;
        width: 0.5rem;
        height: 0.5rem;
      }

      &.green {
        color: #40ee98;
      }

      &.yellow {
        color: #ecee40;
      }

      &.red {
        color: #ee4440;
      }

      span {
        display: block;
        margin: 0.1rem 0 0 0;
        font-size: 0.2rem;
      }
    }
  }
}
</style>
