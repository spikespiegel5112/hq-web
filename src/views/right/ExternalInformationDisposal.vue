<template>
  <Block
    side="right"
    height="row1"
    width="medium"
    title="外部信息处置"
  >
    <div class="externalinformationdisposal">
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
                      v-else-if="column.dataIndex === 'status'"
                      :style="{
                        'text-align': column.align,
                      }"
                    >
                      {{ global.$store.state.dictionary.disposalStatus.find((item2: any) => item2.value === record.status).title }}
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
            y: '3.9rem',
          }"
        >
          <template #bodyCell="{ column, text, record, index }">
            <div
              v-if="column.dataIndex === 'source'"
              class="source"
            >
              {{ global.$store.state.dictionary.source.find((item: any) => item.value === text)?.title }}
            </div>
            <div
              v-if="column.dataIndex === 'status'"
              class="status"
            >
              {{ !!text ? global.$store.state.dictionary.disposalStatus.find((item: any) => item.value === text).title :
                ''
              }}
            </div>

            <div v-if="column.dataIndex === 'handleTime'">
              {{ global.$isNotEmpty(text) ? text : '/' }}
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
import { screenOutInfoResultRequest } from '@/api/screen';

const props = defineProps({
  text: {
    type: String,
    default: '',
    required: false,
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

const columns = ref([
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 30,
    align: 'center',
  },
  {
    title: '来源',
    dataIndex: 'source',
    key: 'source',
    width: 30,
    align: 'center',
  },
  {
    title: '信息内容',
    dataIndex: 'content',
    key: 'content',
    width: 160,
    align: 'left',
  },
  {
    title: '处置情况',
    dataIndex: 'status',
    key: 'status',
    width: 50,
    align: 'center',
    customized: true,
  },
  {
    title: '处置时间',
    dataIndex: 'handleTime',
    key: 'handleTime',
    width: 60,
    align: 'center',
  },
  {
    title: '处置灯',
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

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const state = reactive({
  tableData: [] as any,
});

const getData = () => {
  screenOutInfoResultRequest({
    ...global.$store.state.app.currentQueryDateParams,
  })
    .then((response: any) => {
      console.log('=====screenOutInfoResultRequest=====');
      console.log(response);
      response = response.data;
      response.forEach((item: any, index: number) => {
        item.index = index + 1;
      });

      state.tableData = response;
      transformData();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const transformData = () => {
  const result = state.tableData;
  state.tableData.forEach((item: any, index: number) => {
    columns.value.forEach((item2: any) => {});
    result[index].source = global.$store.state.dictionary.source.find(
      (item2: any) => item2.value === item.source
    )?.title;
  });
  state.tableData = result;
};

const getLightColorByStatus = (record: any) => {
  let color = global.$store.state.dictionary.disposalStatus.find(
    (item: any) => item.value === record.status
  );
  color = color?.lightColor;
  const result = global.$getLightBlubImageUrlByColor(color);
  return result;
};

const getLightNumberByStatus = (tableData: any[], color: string) => {
  const status: number = global.$store.state.dictionary.disposalStatus.find((item: any) => {
    return item.lightColor === color;
  }).value;
  const result: number = tableData.filter((item: any) => item.status === status).length;

  return result;
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.externalinformationdisposal {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  position: relative;

  .table {
    padding: 0 0.2rem;
    height: 4.3rem;
    position: relative;
  }

  .common_table_wrapper {
    // ::v-deep.ant-table-wrapper {
    //   height: 100%;

    //   ::v-deep.ant-table {
    //     ::v-deep.ant-table-content {
    //       ::v-deep.ant-table-tbody {
    //         height: 2.3rem;
    //         overflow: auto;

    //       }
    //     }

    //   }
  }

  .lightbulb {
    img {
      display: inline-block;
      width: 0.1rem;
    }
  }
}
</style>
