<template>
  <Block
    side="right"
    height="row4"
    width="medium"
    title="舆情信息"
  >
    <div class="informationpublicopinion">
      <div class="top">
        <div class="left">
          <CommonTitle title="关键词云" />
          <KeywordCloud :chartData="state.keywordMap" />
        </div>

        <div class="right">
          <CommonTitle title="舆情热度分析" />
          <PublicOpinionHeatAnalysis />
        </div>
      </div>
      <div class="bottom">
        <!-- <a-table
          class="common_table_wrapper"
          :dataSource="state.tableData"
          :columns="columns"
          :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
          size="small"
          :pagination="false"
          :scroll="{
            y: '1.7rem',
          }"
        >
          <template #bodyCell="{ column, text, record, index }">
            <div v-if="column.dataIndex === 'index'">
              {{ index + 1 }}
            </div>
            <div v-if="column.dataIndex === 'publicSentimentSensitive'">
              {{ !!text ? global.$store.state.dictionary.publicSentimentSensitive.find((item: any) => item.value ===
                text).title :
                ''
              }}
            </div>
            <div
              v-if="column.dataIndex === 'content'"
              :style="{
                wordBreak: 'break-all',
              }"
            >
              {{ text }}
            </div>
            <div
              v-if="column.dataIndex === 'attachment'"
              class="attachment"
            >
              <div v-if="!!record.filePath">
                <AButton
                  v-if="!!record.filePath"
                  type="link"
                >
                  <span :style="{ color: '#00FFDE' }">查看</span>
                </AButton>
              </div>
            </div>
          </template>
        </a-table> -->
        <div class="common_scrolltable_wrapper table">
          <div class="header">
            <table>
              <colgroup>
                <col
                  v-for="item in columns"
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
                        v-else-if="column.dataIndex === 'publicSentimentSensitive'"
                        :style="{
                          'text-align': column.align,
                        }"
                      >
                        {{!!record[column.dataIndex] ? global.$store.state.dictionary.publicSentimentSensitive.find((item: any) => item.value ===record[column.dataIndex]).title :''}}
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
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </Vue3SeamlessScroll>
        </div>
      </div>
    </div>
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
import KeywordCloud from './KeywordCloud.vue';
import PublicOpinionHeatAnalysis from './PublicOpinionHeatAnalysis.vue';
import {
  screenPublicSentimentInfoRequest,
  screenImportantPublicSentimentInfoRequest,
} from '@/api/screen.ts';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

const props = defineProps({
  text: {
    type: String,
    default: '',
    required: false,
  },
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
    title: '区域',
    dataIndex: 'publicSentimentArea',
    key: 'publicSentimentArea',
    width: 20,
    align: 'center',
  },
  {
    title: '信息属性',
    dataIndex: 'publicSentimentSensitive',
    key: 'publicSentimentSensitive',
    width: 30,
    align: 'center',
    customized: true,
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
    width: 40,
    align: 'center',
    customized: true,
  },
]);

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const state = reactive({
  tableData: [] as any[],
  psList: [] as any[],
  keywordMap: {},

  currentPreviewImageUrl: '',
  previewImageVisible: false,
  pdfViewerVisible: false,
});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const getData = () => {
  screenPublicSentimentInfoRequest({
    ...global.$store.state.app.currentQueryDateParams.lastOneHourDate,
  })
    .then((response: any) => {
      console.log(response);
      response = response.data;
      state.keywordMap = response.keywordMap;
    })
    .catch((error: any) => {
      console.log(error);
    });

  screenImportantPublicSentimentInfoRequest({
    ...global.$store.state.app.currentQueryDateParams.lastOneHourDate,
  })
    .then((response: any) => {
      response = response.data;
      response.forEach((item: any, index: number) => {
        item.index = index + 1;
      });
      state.tableData = response;
    })
    .catch((error: any) => {
      console.log(error);
    });
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

const checkEnabledFileType = (fileType: number) => {
  const enabledFileTypeList = [0, 2];
  return enabledFileTypeList.some((item: any) => item === fileType);
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.informationpublicopinion {
  padding: 0rem 0.3rem;

  .top {
    display: flex;
    width: 100%;
    align-items: normal;
    height: 4rem;

    .left {
      display: inline-block;
      width: 50%;
      height: 100%;
    }

    .right {
      display: inline-block;
      width: 50%;
      height: 100%;
      position: relative;
    }
  }

  #keywordcloud {
    width: 100%;
    height: 2rem;
  }
}
</style>
