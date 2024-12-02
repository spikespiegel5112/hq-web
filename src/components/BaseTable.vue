<template>
  <div class="common_basetable_wrapper">
    <a-table
      :dataSource="actualTableData"
      :rowClassName="
        (_record, index) => (index % 2 === 1 ? 'table-striped' : undefined)
      "
      :pagination="{
        current: pagination.current,
        total: actualTableData.length,
        pageSize: pagination.pageSize,
      }"
      :scroll="{
        y: props.height,
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
        align="center"
      >
        <template #default="scope">
          <div v-if="item.name === 'index'">
            {{ scope.index + 1 }}
          </div>
          <div v-if="item.name === 'operationColumn'" class="operation">
            <a-button
              v-for="action in item.actions"
              :key="action + scope.$index"
              :class="
                state.actionDictionary.find((item2:any) => item2.name === action).color
              "
              type="link"
              @click.stop="handleAction(action, scope)"
            >
              {{
                state.actionDictionary.find((item2:any) => item2.name === action).label
              }}
            </a-button>
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
  (e: "onEdit", action: string, tableData: any): void;
}>();

const props = defineProps({
  tableData: { type: Array, required: true, default: () => [] },
  dataModel: { type: Array, required: true, default: () => [] },
  sortable: { type: Boolean, default: false },
  showLastColumn: { type: Boolean, default: false },
  pageObj: { type: Object, default: () => null },
  height: { type: String, default: "" },
  processedTableData: { type: Array, default: null },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const pagination = reactive({
  current: 1,
  total: null,
  pageSize: 30,
});

const state = reactive({
  originalTableData: [],
  loading: false,
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
      label: "查看",
      name: "view",
      color: "",
    },
    {
      label: "编辑",
      name: "edit",
      color: "",
    },
    {
      label: "删除",
      name: "delete",
      color: "font-color-red",
    },
  ] as any[],
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

watch(
  () => props.tableData,
  (newValue: any, oldValue: any) => {
    if (newValue instanceof Array) {
      state.originalTableData = [];
      setTimeout(() => {
        state.originalTableData = JSON.parse(JSON.stringify(newValue));
      }, 200);
    } else {
      state.originalTableData = [];
    }
  }
);

const hangleChangePage = (pagin: any, bbb, ccc) => {
  pagination.current = pagin.current;
};

const handleAction = (action: any, scope: any) => {
  const row = scope.row;
  if (action === "download") {
    // this.$emit("onDownload", row);
    return;
  }
  if (action === "preview") {
    // this.$emit("onPreview", row);
    return;
  }

  if (action === "view") {
    // this.$emit("onView", row);
  }
  if (action === "edit") {
    emit("onEdit", action, state.originalTableData[scope.$index]);
  }
  if (action === "delete") {
    // this.$confirm("确认删除？", "提示", {
    //   confirmButtonText: "确定",
    //   cancelButtonText: "取消",
    //   type: "warning",
    // })
    //   .then(() => {
    //     this.$emit("onDelete", row.id);
    //   })
    //   .catch(() => {});
  }
};
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

    .ant-table-wrapper,
    .ant-spin-nested-loading,
    .ant-spin-container,
    .ant-table {
      height: 100%;
    }
    .ant-table {
      height: calc(100vh - 3.5rem);
      background-color: transparent;
    }
    .ant-pagination {
      margin: 0.1rem 0 0 0;
    }
    .ant-table-container {
      .ant-table-tbody {
        .ant-table-row {
          .ant-table-cell {
            padding: 0.05rem;
            .operation {
              .ant-btn {
                color: #0096ff;
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
