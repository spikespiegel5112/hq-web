<template>
  <div class="common_basetable_wrapper">
    <a-table
      :dataSource="actualTableData"
      :loading="state.loading"
      :rowClassName="
        (_record, index) => (index % 2 === 1 ? 'table-striped' : undefined)
      "
      :pagination="false"
      :scroll="{
        y: tableBodyHeight,
      }"
    >
      <a-table-column
        v-for="(item, index) in innerDataModel.filter(
          (item:any) => !!item.tableVisible
        )"
        :key="item.name"
        :title="item.title"
        :data-index="item.name"
        :width="item.width"
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
                v-for="item in actualTableData[scope.index].attachmentList"
              >
                <template v-if="checkFileType(item) === 'image'">
                  <PictureOutlined
                    :style="{
                      color: '#8EE1F9',
                      fontSize: '0.3rem',
                    }"
                  />
                </template>
                <template v-else-if="checkFileType(item) === 'file'">
                  <PaperClipOutlined
                    :style="{
                      color: '#8EE1F9',
                      fontSize: '0.3rem',
                    }"
                  />
                </template>
                <template v-else-if="checkFileType(item) === 'video'">
                  <PaperClipOutlined
                    :style="{
                      color: '#8EE1F9',
                      fontSize: '0.3rem',
                    }"
                  />
                </template>
              </a>
            </a-space>
          </div>
          <div v-if="item.name === 'operationColumn'" class="operation">
            <span
              v-for="(action, index) in item.actions"
              :class="
                state.actionDictionary.find((item2:any) => item2.name === action)?.color
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
                  typeof action==='object'? action.title: state.actionDictionary.find((item2:any) => item2.name === action).label
                }}
              </a-button>
            </span>
          </div>
          <div v-else-if="!!item.tagConfig" class="taglist">
            <a-tag
              :color="
                item.tagConfig.colorList.find(
                  (item2) => item2.value === scope.record[item.name]
                )?.color
              "
            >
              {{ scope.record[item.name] }}
            </a-tag>
          </div>
          <div v-else>
            {{ scope.record[item.name] }}
          </div>
        </template>
      </a-table-column>
    </a-table>
    <a-pagination
      v-model:current="pagination.page"
      show-quick-jumper
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :show-total="(total) => `共 ${total} 条`"
      show-less-items
      @change="hangleChangePage"
    />
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
import { PaperClipOutlined, PictureOutlined } from "@ant-design/icons-vue";

let emit = defineEmits<{
  (e: "onEdit", rowData: any): void;
  (e: "onReview", rowData: any): void;
  (e: "onChangePage", pagination: object): void;
  (e: "onDelete", id: number, row: object): void;
  (e: "onDisposal", row: object): void;
  (e: "onIssueWarning", row: object): void;
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
  tableBodyHeight: { type: String || null, default: null },
  pagination: {
    type: Object,
    default: {
      page: 1,
      pageSize: 30,
      total: 0,
    },
  },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const pagination = reactive({
  current: 1,
  total: 0,
  pageSize: 30,
});

const state = reactive({
  originalTableData: [],
  loading: true,
  actionDictionary: [
    {
      label: "下载",
      name: "download",
      color: null,
    },
    {
      label: "预览",
      name: "preview",
      color: null,
    },
    {
      label: "定位",
      name: "locate",
      color: null,
    },
    {
      label: "详情",
      name: "review",
      color: null,
    },
    {
      label: "详情",
      name: "detail",
      color: null,
    },
    {
      label: "编辑",
      name: "edit",
      color: null,
    },
    {
      label: "事件处置",
      name: "eventDisposal",
      color: null,
    },
    {
      label: "处置",
      name: "disposal",
      color: null,
    },
    {
      label: "发布预警",
      name: "issueWarning",
      color: null,
    },
    {
      label: "删除",
      name: "delete",
      color: "font-color-red",
    },
  ] as any[],
});

const tableHeight = computed(() => {
  if (props.tabTable) {
    return "calc(100vh - 4.9rem)";
  } else {
    return "calc(100vh - 4.3rem)";
  }
});

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
  return isProcessedTableDataExist.value
    ? props.processedTableData
    : state.originalTableData;
}) as any;

const tableBodyHeight = computed(() => {
  let result = tableHeight.value;
  if (props.tableBodyHeight) {
    result = props.tableBodyHeight;
  }
  return result;
}) as any;

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
    state.loading = false;
  }
);

const checkFileType = (file: any) => {
  let result = "";
  const attachmentName = file.attachmentName;
  const fileSufix = attachmentName.split(".")[1];

  const imageType = ["png", "jpg", "jpeg", "gif", "bmp"];
  const videoType = ["mp4", "avi", "mov", "wmv", "flv", "rmvb", "3gp"];
  const fileType = ["xls", "xlsx"];
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
  state.loading = true;
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
  } else if (action === "review") {
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
  }
};

const initPagination = () => {
  pagination.total = global.$isNotEmpty(props.pagination.total)
    ? props.pagination.total
    : pagination.total;
  pagination.pageSize = global.$isNotEmpty(props.pagination.pageSize)
    ? props.pagination.pageSize
    : pagination.pageSize;
};

const checkAtttachmentIcon = (attachmentName: string) => {
  console.log(attachmentName);
  const attachmentType = attachmentName.split(".").pop();
  switch (attachmentType) {
    case "pdf":
      return <PaperClipOutlined />;
    case "doc":
    case "docx":
      return <PaperClipOutlined />;
    case "xls":
    case "xlsx":
      return <PaperClipOutlined />;
    case "ppt":
    case "pptx":
      return <PaperClipOutlined />;
    case "jpg":
      return <PaperClipOutlined />;
    case "jpeg":
    case "png":
    case "gif":
      return <PaperClipOutlined />;
    default:
      return <PaperClipOutlined />;
  }
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
    height: 8.6rem;
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
