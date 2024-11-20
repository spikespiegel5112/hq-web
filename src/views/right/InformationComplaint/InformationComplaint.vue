<template>
  <Block
    side="right"
    height="row4"
    width="medium"
    title="投诉信息"
  >
    <div class="informationcomplaint">
      <div class="sum">
        <span class="label">总数：</span>
        <span class="number"> {{ state.tableData.length }}起 </span>
      </div>
      <CommonTitle title="事件性质" />
      <NatureOfTheIncident />

      <CommonTitle title="区域分类" />
      <ul class="regionalclassification">
        <li v-for="item in state.complaintAreaDictionary">
          <span
            class="number"
            :style="{
              color: item.color,
            }"
            >{{ item.value }}</span
          >
          <span class="title">{{ item.title }}</span>
        </li>
      </ul>
      <!-- <a-table
          class="common_table_wrapper"
          :dataSource="state.tableData"
          :columns="state.columns"
          :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
          size="small"
          :pagination="false"
          :scroll="{
            y: '1.7rem',
          }"
        >
          <template #bodyCell="{ column, text, record, index }">
            <div
              v-if="column.dataIndex === 'index'"
              :style="{
                'text-align': 'center',
              }"
            >
              {{ index + 1 }}
            </div>
            <div
              v-if="column.dataIndex === 'complaintType'"
              class="attachment"
              :style="{
                'text-align': 'center',
              }"
            >
              {{ !!text ? global.$store.state.dictionary.complaintType.find((item: any) => item.value === text).title :
                ''
              }}
            </div>
            <div
              v-if="column.dataIndex === 'attachment' && !!record.filePath"
              type="link"
            >
              <a-button
                v-if="!!record.filePath && checkEnabledFileType(Number(record.fileType))"
                type="link"
                size="small"
                @click="handleCheckAttachment(record)"
              >
                <span :style="{ color: '#00FFDE' }">查看</span>
              </a-button>
            </div>
          </template>
        </a-table> -->
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
                      v-else-if="column.dataIndex === 'complaintType'"
                      :style="{
                        'text-align': column.align,
                      }"
                    >
                      {{ !!record[column.dataIndex] ? global.$store.state.dictionary.complaintType.find((item: any) => item.value === record[column.dataIndex]).title :''}}
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

import NatureOfTheIncident from './NatureOfTheIncident.vue';

import { screenComplaintInfoRequest, screenImportantComplaintInfoRequest } from '@/api/screen.ts';

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;
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
    dataIndex: 'complaintArea',
    key: 'complaintArea',
    width: 30,
    align: 'left',
  },
  {
    title: '类型',
    dataIndex: 'complaintType',
    key: 'complaintType',
    width: 30,
    align: 'left',
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
    width: 30,
    align: 'center',
    customized: true,
  },
]);

const state = reactive({
  complaintAreaDictionary: [] as any,
  tableData: [] as any[],

  currentPreviewImageUrl: '',
  previewImageVisible: false,
  pdfViewerVisible: false,
  previewVideoVisible: false,
  currentVideoFilePath: '',
});

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const getData = () => {
  screenComplaintInfoRequest({
    ...global.$store.state.app.currentQueryDateParams,
  })
    .then((response: any) => {
      response = response.data;
      getComplaintInfoByArea(response);
    })
    .catch((error: any) => {
      console.log(error);
    });

  screenImportantComplaintInfoRequest({
    ...global.$store.state.app.currentQueryDateParams,
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

const getComplaintInfoByArea = (payload: any) => {
  state.complaintAreaDictionary = global.$store.state.dictionary.complaintArea.map((item: any) => {
    return {
      ...item,
      value: payload.filter((item2: any) => item2.areaCategory === item.value).length,
    };
  });
};

const checkEnabledFileType = (fileType: number) => {
  const enabledFileTypeList = [0, 2];
  return enabledFileTypeList.some((item: any) => item === fileType);
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
.informationcomplaint {
  padding: 0rem 0.3rem;
  .sum {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 0.3rem;
    .label {
      color: #fff;
    }
    .number {
      color: #00f6ff;
      font-family: 'ZhenyanGB-Regular';
    }
  }

  #natureoftheincident {
    width: 100%;
    height: 2rem;
  }

  .regionalclassification {
    display: flex;
    margin: 0.1rem 0;
    align-items: normal;

    li {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background-image: url('@/assets/hexagon@2x.png');
      background-size: 100%;
      background-position: center;
      color: #fff;

      span {
        display: block;
        text-align: center;
      }

      .number {
        margin: 0.17rem 0 0.05rem 0;
        font-size: 0.25rem;
        font-family: 'ZhenyanGB-Regular';
      }

      .title {
        margin: 0 auto;
        font-size: 0.15rem;
        color: #c4f7ff;
        width: 0.6rem;
      }
    }
  }
  .common_scrolltable_wrapper {
    .body {
      height: 1.65rem;
    }
  }
}
</style>
