<template>
  <Block
    side="left"
    width="narrow"
    height="short"
    title="运行信息动态"
  >
    <div class="operationinformationdynamics">
      <div class="hint">
        <span class="triangle"></span>
        {{ rollInfoList[0]?.rollingMessageFrom }}
      </div>
      <swiper
        v-if="rollInfoList.length > 0"
        class="mySwiper"
        direction="vertical"
        :autoplay="{
          delay: 5000,
        }"
        :loop="true"
        :pagination="{
          clickable: true,
        }"
        :modules="[Autoplay, Pagination]"
      >
        <swiper-slide
          v-for="item in rollInfoList"
          :key="item.id"
        >
          <h2 class="highlight">
            {{ item.rollingMessageTitle }}
          </h2>
          <div class="content">
            <Vue3SeamlessScroll
              class="body"
              :step="0.1"
              :list="[]"
            >
              <p>
                {{ item.rollingMessageContent }}
              </p>
            </Vue3SeamlessScroll>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </Block>
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

import { screenDailyRollInfoRequest } from '@/api/screen.ts';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const props = defineProps({
  text: {
    type: String,
    default: '',
    required: false,
  },
});

const rollInfoList = ref([] as any);

const state = reactive({});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  async (newValue: any, oldValue: any) => {
    getDataPromise();
  }
);

watch(
  () => rollInfoList.value,
  async (newValue: any, oldValue: any) => {
    await nextTick();
    setTimeout(() => {
      initSwiper();
    }, 3000);
  }
);

const initSwiper = () => {};

const getDataPromise = () => {
  return new Promise((resolve, reject) => {
    screenDailyRollInfoRequest({})
      .then((response: any) => {
        console.log('=====screenDailyRollInfoRequest=====');
        console.log(response);
        response = response.data;
        rollInfoList.value = response.dailyRollInfoList.map((item: any) => {
          return {
            ...item,
            rollingMessageContent: item.rollingMessageContent,
          };
        });

        resolve(response);
      })
      .catch((error: any) => {
        console.log(error);

        reject(error);
      });
  });
};

onMounted(async () => {
  // getDataPromise();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.operationinformationdynamics {
  height: 4.3rem;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  position: relative;

  .hint {
    margin: 0 auto;
    width: 92%;
    color: #fff;
    font-size: 0.3rem;
  }

  .triangle {
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent blue transparent yellow;
    border-width: 0.1rem 0 0.1rem 0.2rem;
  }

  p {
    margin: 0.2rem auto 0;
    width: 92%;
    // height: 2.5rem;
    overflow: auto;
    color: #999;
    line-height: 0.5rem;
    text-align: left;
    font-size: 0.38rem;
  }

  .highlight {
    margin: 0 auto;
    width: 93%;
    background-image: linear-gradient(to bottom, rgba(0, 138, 255, 0), rgba(0, 138, 255, 1));
    height: 1rem;
    line-height: 1.2rem;
    padding: 0 0.1rem;
    color: #fff;
    font-size: 0.32rem;
    text-align: center;
  }

  .swiper {
    height: 3.9rem;

    .swiper-wrapper {
      .swiper-slide {
        height: 3.9rem;
        .content {
          height: 2.9rem;
          overflow: auto;
        }
      }
    }
  }
}
</style>
