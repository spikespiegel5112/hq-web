<template>
  <Block
    side="right"
    height="row3"
    width="medium"
    title="突发事件处理"
  >
    <div class="emergencyeventhandling">
      <RightEvent
        :total="state.tableData.length"
        :red="getLightNumberByStatus(state.tableData, 'red')"
        :green="getLightNumberByStatus(state.tableData, 'green')"
        :orange="getLightNumberByStatus(state.tableData, 'orange')"
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
                :key="record.key"
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
                      v-else-if="column.dataIndex === 'attachment'"
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
              </tr>
            </tbody>
          </table>
        </Vue3SeamlessScroll>
      </div>

      <!-- <div class="table">
        <a-table
          class="common_table_wrapper"
          :dataSource="state.tableData"
          :columns="state.columns"
          :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
          size="small"
          :pagination="false"
          :scroll="{
            y: '3.15rem',
          }"
        >
          <template #bodyCell="{ column, text, record }">
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
      </div> -->
    </div>
    <ResponseModal
      type="emergencyEventHandling"
      :visible="state.responsnModalVisible"
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

import { screenEmergencyResultRequest } from '@/api/screen';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

// const responsnModalVisible = ref(false)
const props = defineProps({
  text: {
    type: String,
    default: '',
    required: false,
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  responsnModalVisible: false,

  tableData: [] as any[],
  currentCode: '',
  currentRowData: {},
});

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
    width: 40,
    align: 'left',
  },
  {
    title: '处置内容',
    dataIndex: 'content',
    key: 'content',
    width: '1.5rem',
    align: 'left',
  },
  {
    title: '时间',
    dataIndex: 'dataTime',
    key: 'dataTime',
    width: '0.7rem',
    align: 'left',
  },
  {
    title: '查看',
    dataIndex: 'check',
    key: 'check',
    width: '0.3rem',
    align: 'left',
    customized: true,
  },
  {
    title: '处置灯',
    dataIndex: 'eventLight',
    key: 'eventLight',
    width: 30,
    align: 'left',
    customized: true,
  },
]);

watch(
  () => state.responsnModalVisible,
  (newValue: any, oldValue: any) => {}
);

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const getData = () => {
  screenEmergencyResultRequest({
    ...global.$store.state.app.currentQueryDateParams.lastOneHourDate,
  })
    .then((response: any) => {
      console.log('=====screenEmergencyResultRequest=====');
      console.log(response);
      response = response.data || [];
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

const getLightNumberByStatus = (tableData: any[], color: string) => {
  const status: number = global.$store.state.dictionary.disposalStatus2.find((item: any) => {
    return item.lightColor === color;
  }).value;
  const result: number = tableData.filter((item: any) => item.status === status).length;

  return result;
};

const getLightColorByStatus = (record: any) => {
  let color = global.$store.state.dictionary.disposalStatus.find(
    (item: any) => item.value === record.status
  );

  color = color?.lightColor;

  const result = global.$getLightBlubImageUrlByColor(color);

  return result;
};

const handleCheckAttachment = (record: any) => {
  state.responsnModalVisible = true;
  state.currentCode = record.oneCode;
  state.currentRowData = record;
};

const handleModalChange = (payload: boolean) => {
  state.responsnModalVisible = false;
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.emergencyeventhandling {
  display: block;
  padding: 0 0.2rem;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  position: relative;
  vertical-align: top;

  .table {
    padding: 0 0.2rem;
    height: 3.35rem;
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

    .common_table_wrapper {
      .ant-table-placeholder {
        height: 3rem;
      }
    }
  }
}
</style>
