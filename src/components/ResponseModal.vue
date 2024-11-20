<template>
  <div
    class="common_responsnmodal_wrapper"
    :class="{ active: state.active }"
    :style="{
      display: props.visible ? 'flex' : 'none',
    }"
  >
    <div
      class="bg"
      @click="handleClose"
    ></div>
    <div
      class="close"
      @click="handleClose"
    >
      <a-button
        type="link"
        :icon="h(CloseOutlined)"
      ></a-button>
    </div>
    <div class="main">
      <div class="left">
        <ul>
          <li>
            <span class="label"> 类型: </span>
            <p>
              {{ props.rowData.infoType }}
            </p>
          </li>
          <li>
            <span class="label"> 等级: </span>
            <p
              :style="{
                color: getResponseLevelData(props.rowData).color,
              }"
            >
              {{ getResponseLevelData(props.rowData).title }}
            </p>
          </li>
          <li>
            <span class="label"> 时间: </span>
            <p>
              {{ props.rowData.dataTime }}
            </p>
          </li>
          <li class="describe">
            <span class="label"> 描述: </span>
            <p>
              {{ props.rowData.content }}
            </p>
          </li>
          <li>
            <span class="label"> 处理状态: </span>
            <p>
              {{
                global.$store.state.dictionary.disposalStatus.find((item:any)=>item.value===props.rowData.status)?.title
              }}
            </p>
          </li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li v-for="(item, index) in state.steopData">
            <div class="index">
              {{ item.sort }}
            </div>
            <div class="content">
              <div class="step">第{{ item.sort }}步</div>
              <div class="status">
                {{ 
                global.$store.state.dictionary.responseStatus.find((item2:any)=>item2.value===item.status)?.title
                }}
              </div>
              <p>
                {{ item.content }}
              </p>
            </div>
          </li>
        </ul>
      </div>
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
  h,
} from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { screenEmergencyResultStepRequest, screenOpPlanResponseStepRequest } from '@/api/screen';

const emit = defineEmits<{
  (e: 'onVisibleChange', value: boolean): void;
}>();
// const visible = defineModel("visible", { type: Boolean, default: false })

// const visible = defineModel<boolean>({ default: false })
const props = defineProps({
  type: {
    type: String,
    default: '',
    required: true,
  },
  code: {
    type: String,
    default: false,
    required: true,
  },
  rowData: {
    type: Object,
    default: {},
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  steopData: [] as any[],
  visible: false,
  active: false,
});

const blockSize = computed(() => {
  return '';
}) as any;

watch(
  () => props.code,
  (newValue: any, oldValue: any) => {
    getData();
    console.log(props.rowData);
  }
);

watch(
  () => props.visible,
  (newValue: any, oldValue: any) => {
    setTimeout(() => {
      state.active = newValue;
    }, 100);
  }
);

onMounted(() => {
  setTimeout(() => {}, 500);
});

const getData = () => {
  if (props.type === 'operationPlanResponse') {
    screenOpPlanResponseStepRequest({
      code: props.code,
    })
      .then((response: any) => {
        console.log(response);
        response = response.data;
        state.steopData = response;
      })
      .catch((error: any) => {
        console.log(error);
      });
  } else if (props.type === 'emergencyEventHandling') {
    screenEmergencyResultStepRequest({
      code: props.code,
    })
      .then((response: any) => {
        console.log(response);
        response = response.data;
        state.steopData = response;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
};

const handleClose = () => {
  state.active = false;
  state.steopData = [];
  setTimeout(() => {
    emit('onVisibleChange', false);
  }, 500);
};

const getResponseLevelData = (rowData: any) => {
  let result = global.$store.state.dictionary.responseLevel.find(
    (item: any) => item.value === rowData.status
  );
  result = !!result
    ? result
    : {
        title: '',
        color: '',
      };
  return result;
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_responsnmodal_wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0.05rem;
  align-items: end;
  opacity: 0;
  transition: all 0.3s;

  &.active {
    opacity: 1;
  }
  .close {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0.3rem;
    right: 0.2rem;
    text-align: right;
    z-index: 1;
    button {
      font-size: 0.3rem;
      color: #fff;
    }
  }
  .bg {
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    position: absolute;
    left: 0;
    top: 0;
  }

  .main {
    display: flex;
    width: 100%;
    max-height: 100%;
    flex: 1;
    position: relative;
    .left {
      display: inline-flex;
      margin: 0 0 0 0.1rem;
      padding: 0.3rem 0.2rem 0 0.2rem;
      width: 3.5rem;
      background-color: rgb(8, 29, 70, 0.5);
      color: #fff;
      font-size: 0.25rem;
      align-items: center;
      ul {
        li {
          display: flex;
          margin: 0 0 0.4rem 0;
          font-size: 0.22rem;

          .label {
            display: inline-block;
            width: 1.2rem;
          }

          &.describe {
            p {
              max-height: 2rem;
              overflow: auto;
            }
          }

          p {
            display: inline;
            margin: 0;
            flex: 1;
          }
        }
      }
    }

    .right {
      display: inline-block;
      flex: 1;
      background-color: #081d46;

      ul {
        li {
          display: flex;
          margin: 0 0 5px 0;
          width: 97%;
          min-height: 1rem;
          background-color: #1b3a9c;
          transition: all 0.3s;
          &:last-child {
            margin: 0;
          }
          &:hover {
            background-color: #367be1;

            .index {
              background-color: #3376f6;
            }
          }

          .index {
            display: flex;
            width: 1rem;
            height: auto;
            text-align: center;
            color: #fff;
            line-height: 1rem;
            font-size: 0.3rem;
            background-color: #2559f6;
            justify-content: center;
            align-items: center;
            font-family: 'ZhenyanGB-Regular';
          }

          .content {
            flex: 1;
            color: #fff;
            font-size: 0.2rem;
            padding: 0 0.2rem;
            background: linear-gradient(to right, #0d46bf 0%, rgba(13, 70, 191, 0) 100%);
            position: relative;
            .step {
              margin: 0.1rem 0 0.2rem 0;
              font-size: 0.3rem;
            }
            .status {
              position: absolute;
              top: 0.1rem;
              right: 0.2rem;
            }

            p {
              margin: 0 0 0.2rem 0;
            }
          }
        }
      }
    }
  }
}
</style>
