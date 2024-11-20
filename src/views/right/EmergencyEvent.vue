<template>
  <Block
    side="right"
    height="row3"
    width="medium"
    title="突发事件"
  >
    <div class="emergencyevent">
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
                v-for="record in state.tableData"
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

import { screenEmergencyRequest } from '@/api/screen';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

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
  tableData: [] as any,
  visible: false,
  currentImageSrc: '',

  previewImageVisible: false,
  currentPreviewImageUrl: '',
  pdfViewerVisible: false,
  currentPdfFilePath: '',
  previewVideoVisible: false,
  currentVideoFilePath: '',
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
    title: '预警类型',
    dataIndex: 'infoType',
    key: 'infoType',
    width: '0.5rem',
    align: 'left',
  },
  {
    title: '预警内容',
    dataIndex: 'content',
    key: 'content',
    width: '1rem',
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
    title: '来源',
    dataIndex: 'source',
    key: 'source',
    width: '0.65rem',
    align: 'left',
  },
  {
    title: '查看',
    dataIndex: 'attachment',
    key: 'attachment',
    width: 30,
    align: 'left',
    customized: true,
  },
  {
    title: '事件灯',
    dataIndex: 'eventLight',
    key: 'eventLight',
    width: 30,
    align: 'center',
    customized: true,
  },
]);

watch(
  () => global.$store.state.app.currentQueryDateParams,
  (newValue: any, oldValue: any) => {
    getData();
  }
);

const getData = () => {
  screenEmergencyRequest({
    ...global.$store.state.app.currentQueryDateParams.lastOneHourDate,
  })
    .then((response: any) => {
      console.log('=====screenEmergencyRequest=====');
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

const handleCheckAttachment = (record: any) => {
  state.currentPreviewImageUrl = 'http://10.125.60.80:9000' + record.filePath;
  switch (Number(record.fileType)) {
    case 0:
      state.previewImageVisible = true;
      return;
    case 1:
      global.$store.commit('app/updateVideoPlayerVisible', true);
      global.$store.commit('app/updateVideoPlayerFilePath', state.currentPreviewImageUrl);
      return;
    case 2:
      global.$store.commit('app/updatePdfViewerVisible', true);
      global.$store.commit('app/updatePdfViewerFilePath', state.currentPreviewImageUrl);
      return;
    default:
  }
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

const checkEnabledFileType = (fileType: number) => {
  const enabledFileTypeList = [0, 1, 2];
  return enabledFileTypeList.some((item: any) => item === fileType);
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.emergencyevent {
  display: block;
  padding: 0 0.2rem;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  height: 100%;
  position: relative;
  vertical-align: top;

  .table {
    height: 3.35rem;

    .ant-table-placeholder {
      height: 3rem;
    }
  }
}
</style>
