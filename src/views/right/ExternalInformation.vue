<template>
  <Block
    side="right"
    height="row1"
    width="medium"
    title="外部信息"
  >
    <div class="externalinformation">
      <RightLight
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
                      v-else-if="column.dataIndex === 'attachment'"
                      class="attachment"
                      :style="{
                        'text-align': column.align,
                      }"
                    >
                      <a-button
                        v-if="!!record.filePath && checkEnabledFileType(Number(record.fileType))"
                        type="link"
                        size="small"
                      >
                        <img
                          src="@/assets/camera@2x.png"
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
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </Vue3SeamlessScroll>
      </div>
      <!-- fallback="http://10.125.60.80:9000/images/outinfo/WBXX-20240920005.jpg" -->
      <a-image
        :width="200"
        :preview="{
            visible: state.previewImageVisible,
            onVisibleChange: (visible:boolean) => {
              state.previewImageVisible = false;
              state.currentPreviewImageUrl = '';
            },
          }"
        :src="state.currentPreviewImageUrl"
      />

      <a-modal
        :style="{
          width: '12rem',
        }"
        v-model:open="state.pdfViewerVisible"
        :footer="null"
      >
        <PDFViewer :filePath="state.currentPreviewImageUrl" />
      </a-modal>
      <!-- <a-table
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
              v-if="column.dataIndex === 'attachment'"
              class="attachment"
            >
              <a-button
                v-if="!!record.filePath && checkEnabledFileType(Number(record.fileType))"
                type="link"
                size="small"
              >
                <img
                  src="@/assets/camera@2x.png"
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
        </a-table> -->
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
import { screenOutInfoRequest } from '@/api/screen';

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
    title: '接收时间',
    dataIndex: 'receivedTime',
    key: 'receivedTime',
    width: 45,
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'infoType',
    key: 'infoType',
    width: 50,
    align: 'left',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    width: 60,
    align: 'left',
  },
  {
    title: '附件',
    dataIndex: 'attachment',
    key: 'attachment',
    width: 30,
    align: 'center',
    customized: true,
  },
  {
    title: '事件灯',
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
  pdfViewerVisible: false,
  currentPdfFilePath: '',
  previewVideoVisible: false,
  currentVideoFilePath: '',
  classOption: {
    direction: 0,
  },
});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const checkEnabledFileType = (fileType: number) => {
  const enabledFileTypeList = [0, 1, 2];
  return enabledFileTypeList.some((item: any) => item === fileType);
};

const getData = () => {
  screenOutInfoRequest({
    ...global.$store.state.app.currentQueryDateParams.lastOneHourDate,
  })
    .then((response: any) => {
      console.log(response);
      response = response.data;
      response.forEach((item: any, index: number) => {
        item.index = index + 1;
        // item.receivedTime = global.$dayjs(item.receivedTime, 'HH:mm:ss.SSS').format('HH:mm:ss')
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

const handleCheckAttachment = (record: any) => {
  state.currentPreviewImageUrl = 'http://10.125.60.80:9000' + record.filePath;

  switch (Number(record.fileType)) {
    case 0:
      state.previewImageVisible = true;
      return;
    case 1:
      state.previewVideoVisible = true;
      return;
    case 2:
      global.$store.commit('app/updatePdfViewerVisible', true);
      global.$store.commit('app/updatePdfViewerFilePath', state.currentPreviewImageUrl);
      return;
    default:
  }
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.externalinformation {
  padding: 0 0.2rem;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  position: relative;

  .table {
    // padding: 0 0.2rem;
    height: 4.2rem;
    position: relative;
  }

  .common_table_wrapper {
  }

  .lightbulb {
    img {
      display: inline-block;
      width: 0.1rem;
    }
  }
}
</style>
