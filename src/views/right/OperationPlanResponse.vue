<template>
  <Block
    side="right"
    height="row2"
    width="medium"
    title="运行预案响应"
  >
    <div class="externalinformation">
      <RightLight
        align="right"
        :red="getLightNumberByStatus(state.tableData, 'red')"
        :green="getLightNumberByStatus(state.tableData, 'green')"
        :yellow="getLightNumberByStatus(state.tableData, 'yellow')"
        :total="state.tableData.length"
      />
      <div class="common_scrolltable_wrapper table">
        <div class="header">
          <table>
            <colgroup>
              <col
                v-for="item in columns"
                :key="item.key"
                :style="{
                  width: typeof item.width === 'number' ? item.width + 'px' : item.width,
                }"
              />
            </colgroup>
            <thead>
              <tr>
                <th
                  v-for="item in columns"
                  :key="item.key"
                  :style="{
                    textAlign: item.align,
                  }"
                >
                  {{ item.title }}
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <Vue3SeamlessScroll
          class="body"
          :list="state.tableData"
          :step="0.1"
        >
          <table>
            <colgroup>
              <col
                v-for="item in columns"
                :key="item.key"
                :style="{
                  width: typeof item.width === 'number' ? item.width + 'px' : item.width,
                }"
              />
            </colgroup>
            <tbody>
              <tr
                v-for="(record, index) in state.tableData"
                :key="index"
              >
                <template v-for="column in columns">
                  <td>
                    <div
                      v-if="!column.customized"
                      :style="{
                        'text-align': column.align,
                      }"
                    >
                      {{ record[column.dataIndex] }}
                    </div>
                    <div
                      v-else-if="column.dataIndex === 'check'"
                      class="check"
                      :style="{
                        'text-align': column.align,
                      }"
                    >
                      <a-button
                        type="link"
                        size="small"
                      >
                        <img
                          src="@/assets/hand@2x.png"
                          alt=""
                          @click="handleCheckAttachment(record)"
                        />
                      </a-button>
                    </div>
                    <div
                      v-else-if="column.dataIndex === 'eventLight'"
                      :style="{
                        'text-align': column.align,
                      }"
                    >
                      <img
                        :src="getLightColorByStatus(record)"
                        alt=""
                        :style="{
                          width: '0.19rem',
                        }"
                      />
                    </div>
                  </td>
                </template>

                <!-- <td
                  v-for="item2 in columns.filter((item2:any)=>!item2.customized)"
                  :style="{
                    textAlign: item2.align,
                  }"
                  v-text="record[item2.dataIndex]"
                ></td>
                <td>
                  <div class="check">
                    <a-button
                      type="link"
                      size="small"
                    >
                      <img
                        src="@/assets/hand@2x.png"
                        alt=""
                        @click="handleCheckAttachment(record)"
                      />
                    </a-button>
                  </div>
                </td>
                <td>
                  <div
                    
                    :style="{
                      'text-align': 'center',
                    }"
                  >
                    <img
                      :src="getLightColorByStatus(record)"
                      alt=""
                      :style="{
                        width: '0.19rem',
                      }"
                    />
                  </div>
                </td> -->
              </tr>
            </tbody>
          </table>
        </Vue3SeamlessScroll>
      </div>
      <!-- <div class="table">
        <a-table
          class="common_table_wrapper"
          :dataSource="state.tableData"
          :columns="columns"
          :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
          size="small"
          :pagination="false"
          :scroll="{
            y: '4.35rem',
          }"
        >
          <template #bodyCell="{ column, text, record, index }">
            <div v-if="column.dataIndex === 'source'">
              {{ !!text ? global.$store.state.dictionary.source.find((item: any) => item.value === text).title : '' }}
            </div>
            <div
              v-if="column.dataIndex === 'check'"
              class="check"
            >
              <a-button
                type="link"
                size="small"
              >
                <img
                  src="@/assets/hand@2x.png"
                  alt=""
                  @click="handleCheckAttachment(record)"
                />
              </a-button>
            </div>

            <div
              v-if="column.dataIndex === 'eventLight'"
              
              :style="{
                'text-align': 'center',
              }"
            >
              <img
                :src="getLightColorByStatus(record)"
                alt=""
                :style="{
                  width: '0.19rem',
                }"
              />
            </div>
          </template>
        </a-table>
        <a-image
          :width="200"
          :preview="{
            visible: state.previewImageVisible,
          }"
          :src="state.currentPreviewImageUrl"
        />
      </div> -->
    </div>
    <ResponseModal
      type="operationPlanResponse"
      :visible="state.modalVisible"
      @onVisibleChange="handleModalChange"
      :code="state.currentCode"
      :rowData="state.currentRowData"
    />
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
import { screenOpPlanResponseRequest } from '@/api/screen';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

import ResponseModal from '@/components/ResponseModal.vue';

const props = defineProps({
  text: {
    type: String,
    default: '',
    required: false,
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const columns = ref([
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 30,
    align: 'center',
  },
  {
    title: '报警类型',
    dataIndex: 'infoType',
    key: 'infoType',
    width: 50,
    align: 'left',
  },
  {
    title: '处置内容',
    dataIndex: 'content',
    key: 'content',
    width: 60,
    align: 'left',
  },
  {
    title: '时间',
    dataIndex: 'dataTime',
    key: 'dataTime',
    width: 50,
    align: 'left',
  },
  {
    title: '查看',
    dataIndex: 'check',
    key: 'check',
    width: 30,
    align: 'center',
    customized: true,
  },
  {
    title: '处置灯  ',
    dataIndex: 'eventLight',
    key: 'eventLight',
    width: 40,
    align: 'center',
    customized: true,
  },
]);

function getImageUrl(name: string) {
  return new URL(`/src/assets/lightbulb-${name}@2x.png`, import.meta.url).href;
}

const state = reactive({
  tableData: [] as any,
  previewImageVisible: false,
  currentPreviewImageUrl: '',
  modalVisible: false,
  previewVideoVisible: false,
  currentVideoFilePath: '',
  currentCode: '',
  currentRowData: {},
});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const getData = () => {
  screenOpPlanResponseRequest({
    ...global.$store.state.app.currentQueryDateParams,
  })
    .then((response: any) => {
      console.log('=====screenOpPlanResponseRequest=====');
      console.log(response);
      response = response.data;
      response.forEach((item: any, index: number) => {
        item.index = index + 1;
        item.receivedTime = global.$dayjs(item.receivedTime, 'HH:mm:ss.SSS').format('HH:mm:ss');
      });
      state.tableData = response;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const getLightColorByStatus = (record: any) => {
  let color = global.$store.state.dictionary.disposalStatus.find(
    (item: any) => item.value === record.status
  );
  color = color?.lightColor;
  const result = global.$getLightBlubImageUrlByColor(color);
  return result;
};

const getEventLightImage = (status: number) => {
  const color: string | null = global.$store.state.dictionary.disposalStatus.find(
    (item: any) => item.value === status
  )?.lightColor;
  return global.$getLightBlubImageUrlByColor(text);
};

const getLightNumberByStatus = (tableData: any[], color: string) => {
  const status: number = global.$store.state.dictionary.disposalStatus.find((item: any) => {
    return item.lightColor === color;
  }).value;
  const result: number = tableData.filter((item: any) => item.status === status).length;

  return result;
};

const handleCheckAttachment = (record: any) => {
  state.modalVisible = true;
  state.currentCode = record.oneCode;
  state.currentRowData = record;
};

const handleModalChange = (payload: boolean) => {
  state.modalVisible = false;
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.externalinformation {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  position: relative;

  .table {
    padding: 0 0.2rem;
    height: 4.85rem;
    position: relative;

    .check {
      .ant-btn {
        font-size: 0.2rem;
        color: #00ffde;

        img {
          width: 0.22rem;
        }
      }
    }
  }

  .lightbulb {
    img {
      display: inline-block;
      width: 0.1rem;
    }
  }

  .common_responsemodal_wrapper {
    background-color: red;
    left: 0;
    bottom: 0.5rem;
  }
}
</style>
