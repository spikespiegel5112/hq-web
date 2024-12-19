<template>
  <div class="common_basetable_wrapper">
    <a-table
      :dataSource="actualTableData"
      :loading="state.loading"
      :rowClassName="
        (_record, index) => (index % 2 === 1 ? 'table-striped' : undefined)
      "
      :pagination="{
        current: pagination.page,
        total: pagination.total,
        pageSize: pagination.pageSize,
      }"
      :scroll="{
        y: tableBodyHeight,
      }"
      @change="hangleChangePage"
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
            <a href="javascript:;">
              <img
                :src="global.$getImageUrl('/src/assets/camera.png')"
                alt=""
              />
            </a>
          </div>
          <div v-if="item.name === 'operationColumn'" class="operation">
            <span
              v-for="(action, index) in item.actions"
              :class="
                state.actionDictionary.find((item2:any) => item2.name === action).color
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
          <div v-else>
            {{ scope.record[item.name] }}
          </div>
        </template>
      </a-table-column>
    </a-table>
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

const emit = defineEmits<{
  (e: "onEdit", rowData: any): void;
  (e: "onReview", rowData: any): void;
  (e: "onChangePage", pagination: object): void;
  (e: "onDelete", id: number, row: object): void;
  (e: "onDisposal", row: object): void;
}>();

const props = defineProps({
  tableData: { type: Array, required: true, default: () => [] },
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
      color: "",
    },
    {
      label: "预览",
      name: "preview",
      color: "",
    },
    {
      label: "定位",
      name: "locate",
      color: "",
    },
    {
      label: "详情",
      name: "review",
      color: "",
    },
    {
      label: "详情",
      name: "detail",
      color: "",
    },
    {
      label: "编辑",
      name: "edit",
      color: "",
    },
    {
      label: "事件处置",
      name: "eventDisposal",
      color: "",
    },
    {
      label: "处置",
      name: "disposal",
      color: "",
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

const hangleChangePage = (pagin: any) => {
  state.loading = true;
  pagination.current = pagin.current;
  pagination.pageSize = pagin.pageSize;
  emit("onChangePage", pagination);
};

const handleAction = (action: any, scope: any) => {
  const row = scope.record;
  if (action === "download") {
    // this.$emit("onDownload", row);
    return;
  }
  if (action === "preview") {
    // this.$emit("onPreview", row);
    return;
  }

  if (action === "review") {
    emit("onReview", state.originalTableData[scope.index]);
  }
  if (action === "edit") {
    emit("onEdit", state.originalTableData[scope.index]);
  }
  if (action === "delete") {
    global.$confirm({
      title: "提示",
      content: "确认删除？",
      onOk: () => {
        emit("onDelete", row.id, row);
      },
    });
  }
  if (action === "disposal") {
    emit("onDisposal", row);
  }
};

const initPagination = () => {
  pagination.total = props.pagination.total;
  pagination.pageSize = props.pagination.pageSize;
};

onMounted(() => {});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common_basetable_wrapper {
  height: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  text-align: left;
  position: relative;
  background-color: transparent;

  :deep(.ant-table-wrapper) {
    height: 100%;
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
          .ant-table-cell {
            padding: 0.05rem;
            .operation {
            }
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
}
</style>
