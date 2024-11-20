<template>
  <div class="common_rightevent_wrapper">
    <ul>
      <li
        class="green"
        :class="{ off: props.green === 0 }"
      >
        <img
          src="@/assets/event-green@2x.png"
          alt=""
        />
        <span>{{ props.green }}/{{ props.total }}</span>
      </li>
      <li
        class="orange"
        :class="{ off: props.orange === 0 }"
      >
        <img
          src="@/assets/event-orange@2x.png"
          alt=""
        />
        <span>{{ props.orange }}/{{ props.total }}</span>
      </li>
      <li
        class="red"
        :class="{ off: props.red === 0 }"
      >
        <img
          src="@/assets/event-red@2x.png"
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
  orange: {
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

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_rightevent_wrapper {
  display: block;
  padding: 0 2rem;
  width: 100%;
  height: 1.5rem;
  position: relative;
  font-family: 'ZhenyanGB-Regular';
  ul {
    display: flex;
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
        width: 1.5rem;
      }

      &.green {
        color: #40ee98;
      }

      &.orange {
        color: #ff5700;
      }

      &.red {
        color: #ee4440;
      }

      &.yellow {
        color: #ecee40;
      }

      span {
        display: block;
        margin: 0.1rem 0 0 0;
        font-size: 0.3rem;
      }
    }
  }
}
</style>
