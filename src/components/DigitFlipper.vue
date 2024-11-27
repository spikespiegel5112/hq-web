<template>
  <div class="chartNum">
    <div
      class="box-item"
      :style="{
        width: digitsLength * props.digitWidth + props.unit,
        height: props.digitHeight + props.unit,
      }"
    >
      <li
        v-for="(item, index) in state.orderNum"
        :class="{
          'number-item': !isNaN(item),
          'mark-item': isNaN(item),
          visible: checkZeroFromBegining(index),
        }"
        :key="index"
      >
        <span v-if="!isNaN(item)">
          <i
            ref="numberItem"
            :myIndex="index"
            :myValue="item"
            :style="{
              top: props.top + props.unit,
            }"
          >
            0123456789
          </i>
        </span>
      </li>
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
  VueElement,
} from 'vue';

const props = defineProps({
  digits: {
    type: Number,
    default: 0,
    required: true,
  },
  digitWidth: {
    type: Number,
    default: 0.2,
    required: false,
  },
  digitHeight: {
    type: Number,
    default: 0.5,
    required: false,
  },
  top: {
    type: Number,
    default: 0.12,
    required: false,
  },
  unit: {
    type: String,
    default: 'rem',
    required: false,
  },
  time: {
    type: Number,
    default: 0,
    required: false,
  },
});

const numberItem = ref([]);

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  orderNum: [] as any[], // 默认订单总数
  newNumber: 0,
});

const increaseNumber = (time: number) => {
  const timer = setInterval(() => {
    state.newNumber = state.newNumber + getRandomNumber(1, 100);
    setNumberTransform();
  }, time * 1000);
};

// 设置文字滚动
const setNumberTransform = () => {
  // 拿到数字的ref，计算元素数量 numberItems数组自身顺序有问题，需要处理成和数值保持一致
  const numberItems = numberItem;
  numberItems.value.sort((a: any, b: any) => {
    // 如果value相同，按照value的降序
    if (a.attributes.myIndex.value === b.attributes.myIndex.value) {
      return b.attributes.myIndex.value - a.attributes.myIndex.value;
    }
    return a.attributes.myIndex.value - b.attributes.myIndex.value;
  });

  // 在 template 里面加上 myIndex 和 myValue 属性，是因为有次发现，显示出来的结果不准确
  // 经排查，发现是 numberItems字段里面获取的 html元素顺序不对，所以重新给他排好序
  // 注意：numberItems字段里面获取的 html元素顺序不对 是偶尔发生的现象，但是为了安全起见，还是处理下

  const numberArr = state.orderNum.filter((item:any) => !isNaN(item));
  // 结合CSS 对数字字符进行滚动,显示订单数量
  for (let index = 0; index < numberItems.value.length; index++) {
    const elem: VueElement = numberItems.value[index];
    elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
  }
};
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// 处理传过来的具体值value
const toOrderNum = (num: number | string) => {
  let numberString: string = global.$isNotEmpty(num) ? num.toString() : '0';
  // 把具体值value变成字符串
  if (numberString.length < 8) {
    numberString = '0' + numberString; // 如未满八位数，添加"0"补位
    toOrderNum(numberString); // 递归添加"0"补位
  } else if (numberString.length === 8) {
    // 具体值value中加入逗号
    state.orderNum = numberString.split(''); // 将其便变成数据，渲染至滚动数组
  } else {
    // 具体值value数字超过八位显示异常
    alert('xxx数量过大，显示异常，请联系后台管理员');
  }
};

const hiddenLength = computed(() => {
  const digits = global.$isNotEmpty(props.digits) ? props.digits.toString() : '0';
  const digitsList: string[] = digits.split('');
  const result = 8 - digitsList.length;
  return result;
}) as any;

const digitsLength = computed(() => {
  const digits = global.$isNotEmpty(props.digits) ? props.digits.toString() : '0';
  const digitsList: string[] = digits.split('');
  return digitsList.length;
});

watch(
  () => props.digits,
  (newValue: any, oldValue: any) => {
    toOrderNum(props.digits); // 这里输入数字即可调用
  }
);

const checkZeroFromBegining = (index: number) => {
  return index >= hiddenLength.value;
};

onMounted(() => {
  toOrderNum(props.digits); // 这里输入数字即可调用
  increaseNumber(props.time);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chartNum {
  display: inline-flex;
  align-items: center;
  /*具体值value总量滚动数字设置*/
  .box-item {
    position: relative;
    height: 0.5rem;
    text-align: center;
    list-style: none;
    writing-mode: vertical-lr;
    text-orientation: upright;
    /*文字禁止编辑*/
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    overflow: hidden;
  }
  /* 默认逗号设置 */
  .mark-item {
    width: 10px;
    height: 100px;
    line-height: 10px;
    position: relative;
    & > span {
      position: absolute;
      width: 100%;
      bottom: 0;
      writing-mode: vertical-rl;
      text-orientation: upright;
    }
  }
  /*滚动数字设置*/
  .number-item {
    // display: inline-flex;
    width: 0.2rem;
    // height: 75px;
    list-style: none;
    position: absolute;

    &.visible {
      position: relative;
    }
    & > span {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 100%;
      writing-mode: vertical-rl;
      text-orientation: upright;
      overflow: hidden;
      // left: -25%;
      & > i {
        font-style: normal;
        position: absolute;

        left: 50%;
        transform: translate(-50%, 0);
        transition: transform 1s ease-in-out;
        letter-spacing: 10px;
      }
    }
  }
  .number-item:last-child {
    margin-right: 0;
  }
}
</style>
