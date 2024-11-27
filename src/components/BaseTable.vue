<template>
  <div class="common_basetable_wrapper">
    <a-table :dataSource="actualTableData">
      <a-table-column
        v-for="(item, index) in innerDataModel.filter(
          (item:any) => !!item.tableVisible
        )"
        :key="index"
        :label="item.label"
        :prop="item.name"
        :width="item.width"
        :fixed="item.fixed"
        align="center"
      >
        <template #default="scope">
          <div v-if="item.name === 'index'">
            {{ scope.$index + 1 }}
          </div>
          <div v-if="item.name === 'operationColumn'">
            <a-button
              v-for="action in item.actions"
              :key="action + scope.$index"
              :class="
                state.actionDictionary.find((item2:any) => item2.name === action).color
              "
              type="text"
              @click.stop="handleAction(action, scope)"
            >
              {{
                state.actionDictionary.find((item2:any) => item2.name === action).label
              }}
            </a-button>
          </div>
          <div v-else>
            {{ scope.row[item.name] }}
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

const props = defineProps({
  tableData: { type: Array, required: true, default: null },
  dataModel: { type: Array, required: true, default: () => [] },
  sortable: { type: Boolean, default: false },
  showLastColumn: { type: Boolean, default: false },
  pageObj: { type: Object, default: () => null },
  height: { type: String, default: "auto" },
  processedTableData: { type: Array, default: null },
});

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

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
  return props.dataModel.length > 0
    ? props.dataModel.map((item: any) => {
        let modifiedItem = {} as any;
        switch (item.name) {
          case "index":
            modifiedItem.width = 60;
            break;
          case "operationColumn":
            modifiedItem.width = 160;
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
    // this.$emit("onEdit", action, this.originalTableData[scope.$index]);
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
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  overflow: hidden;
  text-align: left;
  position: relative;
  .header {
    padding: 0.05rem 0.1rem;
    width: 100%;
    height: 0.3rem;
    background-image: linear-gradient(
      to right,
      rgba(68, 121, 255, 1),
      rgba(68, 121, 255, 0)
    );
  }
}
</style>
