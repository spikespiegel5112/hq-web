<template>
  <div class="common_basetable_wrapper">
    <a-table
      :dataSource="actualTableData"
      :loading="global.$store.state.app.tableLoading"
      :rowClassName="
        (_record, index) => (index % 2 === 1 ? 'table-striped' : undefined)
      "
      :pagination="false"
      :scroll="{
        y: tableBodyHeight,
      }"
      :style="{
        height: tableBodyHeight,
      }"
    >
      <a-table-column
        v-for="(item, index) in innerDataModel.filter(
          (item:any) => !!item.tableVisible
        )"
        :key="item.name"
        :title="item.title"
        :data-index="item.name"
        :width="parsedColumnWidth(item)"
        :fixed="item.fixed"
        :align="global.$isNotEmpty(item.align) ? item.align : 'center'"
      >
        <template #default="scope">
          <div v-if="item.name === 'index'">
            {{ scope.index + 1 }}
          </div>
          <div v-if="item.name === 'attachment'" class="attachment">
            <a-space>
              <a
                href="javascript:;"
                v-for="item2 in getAttachmentTypeList(
                  actualTableData[scope.index].attachmentList
                )"
              >
                <template v-if="item2 === 'image'">
                  <a-button
                    :key="item2"
                    type="link"
                    @click.stop="handlePreview(scope, 'image')"
                  >
                    <PictureOutlined
                      :style="{
                        color: '#8EE1F9',
                        fontSize: '0.3rem',
                      }"
                    />
                  </a-button>
                </template>
                <template v-else-if="item2 === 'file'">
                  <a-button
                    :key="item2"
                    type="link"
                    @click.stop="handlePreview(scope, 'file')"
                  >
                    <PaperClipOutlined
                      :style="{
                        color: '#8EE1F9',
                        fontSize: '0.3rem',
                      }"
                    />
                  </a-button>
                </template>
                <template v-else-if="item2 === 'video'">
                  <a-button
                    :key="item2"
                    type="link"
                    @click.stop="handlePreview(scope, 'video')"
                  >
                    <VideoCameraOutlined
                      :style="{
                        color: '#8EE1F9',
                        fontSize: '0.3rem',
                      }"
                    />
                  </a-button>
                </template>
              </a>
            </a-space>
          </div>
          <div v-else-if="item.imagePreview === true" class="imagePreview">
            <a-image :src="scope.record[item.name]" :width="100" />
            <!-- imagePreview -->
          </div>

          <div v-else-if="!!item.tagConfig" class="taglist">
            <a-tag
              :color="
                item.tagConfig.colorList.find(
                  (item2) => item2.value === scope.record[item.name]
                )?.color
              "
            >
              {{
                !!item.tagConfig.val
                  ? item.tagConfig.dictionary.find((item2) => {
                      const result =
                        item2.value === scope.record[item.tagConfig.val];
                      return result;
                    })?.label
                  : scope.record[item.name]
              }}
            </a-tag>
          </div>
          <div v-else-if="item.name === 'operationColumn'" class="operation">
            <span
              v-for="(action, index) in item.actions"
              :class="
                global.$store.state.dictionary.actionDictionary.find((item2:any) => item2.name === action)?.color
              "
            >
              <a-divider
                v-if="index > 0"
                type="vertical"
                style="margin: 0; height: 20px; background-color: #0096ff"
              />
              <a-button
                :key="action + scope.$index"
                type="link"
                @click.stop="handleAction(action, scope)"
              >
                {{
                  typeof action==='object'? action.title: global.$store.state.dictionary.actionDictionary.find((item2:any) => item2.name === action).label
                }}
              </a-button>
            </span>
          </div>
          <div v-else>
            <template v-if="!!item.rows && typeof item.rows === 'number'">
              <a-popover trigger="hover">
                <template #content>
                  <div
                    :style="{
                      width: '2.5rem',
                    }"
                  >
                    {{ scope.record[item.name] }}
                  </div>
                </template>
                <div
                  :style="{
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': item.rows,
                    overflow: 'hidden',
                    'text-overflow': 'ellipsis',
                  }"
                >
                  {{ scope.record[item.name] }}
                </div>
              </a-popover>
            </template>
            <div v-else>
              {{ scope.record[item.name] }}
            </div>
          </div>
        </template>
      </a-table-column>
    </a-table>
    <a-pagination
      v-if="!!props.pagination"
      v-model:current="pagination.page"
      showQuickJumper
      showLessItems
      showSizeChanger
      :pageSizeOptions="['10', '20', '30', '50', '100']"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :show-total="(total:number) => `共 ${total} 条`"
      @change="hangleChangePage"
    />

    <AttachmentPreview
      :visible="state.dialogVisible"
      :fileType="state.currentPreviewFileType"
      :attachmentList="state.attachmentList"
      @onClose="state.dialogVisible = false"
    ></AttachmentPreview>
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
} from "vue";
import AttachmentPreview from "@/components/AttachmentPreview.vue";
import {
  PaperClipOutlined,
  PictureOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons-vue";

const emit = defineEmits<{
  (e: "onEdit", rowData: any): void;
  (e: "onReview", rowData: any): void;
  (e: "onChangePage", pagination: object): void;
  (e: "onDelete", id: number, row: object): void;
  (e: "onDisposal", row: object): void;
  (e: "onIssueWarning", row: object): void;
  (e: "onDistributeRole", row: object): void;
}>();

const props = defineProps({
  tableData: { type: Array, required: true, default: () => [] },
  originalTableData: { type: Array, required: false, default: () => [] },
  dataModel: { type: Array, required: true, default: () => [] },
  sortable: { type: Boolean, default: false },
  showLastColumn: { type: Boolean, default: false },
  pageObj: { type: Object, default: () => null },
  height: { type: String, default: "" },
  processedTableData: { type: Array, default: null },
  tabTable: { type: Boolean, default: false },
  statisticTable: { type: Boolean, default: false },
  tableBodyHeight: { type: String || null, default: null },
  pagination: {
    type: [Object, Boolean],
    default: {
      page: 1,
      pageSize: 10,
      total: 0,
    },
  },

  dialogVisible: false,
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const pagination = reactive({
  current: 1,
  total: 0,
  pageSize: 10,
});

const state = reactive({
  originalTableData: [],
  loading: true,
  actionDictionary: [] as any[],
  dialogVisible: false,
  attachmentList: [] as any[],
  currentPreviewFileType: "",
});

const tableHeight = computed(() => {
  const offsetTabTable = 0.6;
  const offsetStatisticTable = 3;
  let offset = 3.8;
  if (props.tabTable) {
    offset += offsetTabTable;
  }
  if (props.statisticTable) {
    offset += offsetStatisticTable;
  }

  let result = `calc(100vh - ${offset}rem)`;
  return result;
});

const tableBodyHeight = computed(() => {
  let result = tableHeight.value;
  if (props.tableBodyHeight) {
    result = props.tableBodyHeight;
  }
  return result;
}) as any;

const parsedColumnWidth = (item: any) => {
  let result;

  if (item.key === "operationColumn") {
    result =
      item.actions.reduce((sum: number, cur: number) => {
        const actionDictionary =
          global.$store.state.dictionary.actionDictionary;
        const charLength = actionDictionary.find(
          (item2: any) => item2.name === cur
        ).label.length;
        return sum + (charLength * 2 + 45);
      }, 0) +
      80 +
      "px";
  } else if (item.key === "attachment") {
    result = 100;
  } else {
    result = item.width;
  }

  return result;
};

const innerDataModel = computed(() => {
  const dataModel = props.dataModel.map((item: any) => {
    return {
      ...item,
      title: item.label,
      dataIndex: item.name,
      key: item.name,
    };
  });

  return dataModel.length > 0
    ? dataModel.map((item: any) => {
        let modifiedItem = {} as any;
        switch (item.name) {
          case "index":
            modifiedItem.width = 60;
            break;
          case "operationColumn":
            modifiedItem.width = item.actions.reduce(
              (sum: number, cur: number) => {
                return sum + 75;
              },
              0
            );
            break;
        }
        item = {
          ...item,
          ...modifiedItem,
        };
        return item;
      })
    : [];
}) as any;

const isProcessedTableDataExist = computed(() => {
  const processedTableData = props.processedTableData;
  return processedTableData instanceof Array && processedTableData.length > 0;
}) as any;

const actualTableData = computed(() => {
  const processedTableData = props.processedTableData;
  const result = isProcessedTableDataExist.value
    ? processedTableData
    : state.originalTableData;
  return result;
}) as any;

const parseTableWrapperHeight = computed(() => {
  return props.statisticTable ? "calc(100vh - 6.7rem)" : "calc(100vh - 3.7rem)";
});

watch(
  () => props.tableData,
  (newValue: any, oldValue: any) => {
    if (newValue instanceof Array) {
      state.originalTableData = [];
      state.originalTableData = JSON.parse(JSON.stringify(newValue));
    } else {
      state.originalTableData = [];
    }
    initPagination();
    global.$store.commit("app/updateTableLoading", false);
  },
  {
    deep: true,
  }
);

watch(
  () => props.loading,
  (newValue: any, oldValue: any) => {
    global.$store.commit("app/updateTableLoading", newValue);
  }
);

const checkFileType = (file: any) => {
  let result = "";
  const attachmentName = file.attachmentName;

  const fileSufix = attachmentName.split(".").pop().toLowerCase();

  const imageType = ["png", "jpg", "jpeg", "gif", "bmp"];
  const videoType = ["mp4", "avi", "mov", "wmv", "flv", "rmvb", "3gp"];
  const fileType = ["xls", "xlsx", "pdf"];
  if (imageType.includes(fileSufix)) {
    result = "image";
  }
  if (videoType.includes(fileSufix)) {
    result = "video";
  }
  if (fileType.includes(fileSufix)) {
    result = "file";
  }
  return result;
};

const hangleChangePage = (current: number, pageSize: number) => {
  global.$store.commit("app/updateTableLoading", true);
  pagination.current = current;
  pagination.pageSize = pageSize;
  emit("onChangePage", pagination);
};

const handleAction = (action: any, scope: any) => {
  const row = scope.record;
  if (action === "download") {
    // this.$emit("onDownload", row);
    return;
  } else if (action === "preview") {
    // this.$emit("onPreview", row);
    return;
  } else if (["review", "detail"].includes(action)) {
    emit("onReview", state.originalTableData[scope.index]);
  } else if (action === "edit") {
    emit("onEdit", state.originalTableData[scope.index]);
  } else if (action === "delete") {
    global.$confirm({
      title: "提示",
      content: "确认删除？",
      onOk: () => {
        emit("onDelete", row.id, state.originalTableData[scope.index]);
      },
    });
  } else if (action === "disposal" || action === "eventDisposal") {
    emit("onDisposal", state.originalTableData[scope.index]);
  } else if (action === "issueWarning") {
    emit("onIssueWarning", state.originalTableData[scope.index]);
  } else if (action === "distributeRole") {
    emit("onDistributeRole", state.originalTableData[scope.index]);
  }
};

const handlePreview = (scope: any, type: string) => {
  const record = scope.record;
  const attachmentList = record.attachmentList;
  const imageList = attachmentList.filter(
    (item: any) => checkFileType(item) === type
  );
  state.dialogVisible = true;
  state.attachmentList = imageList;
  state.currentPreviewFileType = type;
};

const initPagination = () => {
  if (!!props.pagination) {
    pagination.total = global.$isNotEmpty(props.pagination.total)
      ? props.pagination.total
      : pagination.total;
    pagination.pageSize = global.$isNotEmpty(props.pagination.pageSize)
      ? props.pagination.pageSize
      : pagination.pageSize;
  }
};

const getAttachmentTypeList = (attachmentList: any) => {
  const typeList = [] as any[];
  attachmentList.forEach((item: any) => {
    if (checkFileType(item) === "image" && !typeList.includes("image")) {
      typeList.push("image");
    }
    if (checkFileType(item) === "file" && !typeList.includes("file")) {
      typeList.push("file");
    }
    if (checkFileType(item) === "video" && !typeList.includes("video")) {
      typeList.push("video");
    }
  });
  return typeList;
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_basetable_wrapper {
  // height: 100%;
  // height: tableBodyHeight;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  text-align: left;
  position: relative;
  background-color: transparent;
  :deep(.ant-tabs) {
    background-color: red;
    .ant-tabs-content-holder {
      .ant-table-wrapper {
        height: 4rem;
      }
    }
  }
  :deep(.ant-table-wrapper) {
    background-color: transparent;

    .ant-table {
      height: 100%;
      background-color: transparent;
    }
    .ant-pagination {
      margin: 0.15rem 0;
    }
    .ant-table-container {
      height: 100%;
      .ant-table-tbody {
        .ant-table-row {
          .ant-table-cell {
            padding: 0.05rem;
            .status {
              img {
                display: inline-block;
                width: 0.3rem;
              }
            }
            .attachment {
              .ant-btn {
                padding: 2.428571428571429px 0;
              }
              img {
                display: inline-block;
                width: 0.3rem;
              }
            }
            .taglist {
            }
            .operation {
              span {
              }
            }
          }

          &.table-striped,
          &:hover {
            transition: all 0.3s;
            > td {
              background-color: #0b234b;
            }
          }
          &:hover {
            > td {
              background-color: #1a4378;
            }
          }
          &.table-striped {
          }
        }
      }
      .ant-table-thead {
        tr {
          .ant-table-cell {
            padding: 0.05rem;
            background-color: #1a4378;
          }
        }
      }
    }
  }
  .ant-pagination {
    margin: 0.2rem 0 0.1rem 0;
    text-align: right;
  }
  .taglist {
    .ant-tag {
      color: #fff;
      font-size: 0.19rem;
      &.ant-tag-warning {
        border-color: #f5a96c;
        background-color: rgb(245, 169, 108, 0.2);
      }
      &.ant-tag-error {
        border-color: #f56c6c;
        background-color: rgb(245, 108, 108, 0.2);
      }
      &.ant-tag-error {
        border-color: green;
        background-color: rgb(0, 128, 0, 0.2);
      }
    }
  }
}
</style>
