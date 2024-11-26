import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import utils from "@/utils/utils";
import service from "@/utils/service";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
const app = createApp(App);

import { store, key } from "@/store";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import weekday from 'dayjs/plugin/weekday'
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);
// dayjs.extend(weekday)

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import {
  PieChart,
  PieSeriesOption,
  BarChart,
  LineChart,
  RadarChart,
  RadarSeriesOption,
} from "echarts/charts";
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  VisualMapComponent,
  TooltipComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  GridComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
} from "echarts/components";

import { CustomChart } from "echarts/charts";

// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

type EChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
  | TitleComponentOption
  | ToolboxComponentOption
  | GridComponentOption
  | DataZoomComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  RadarChart,
  CustomChart,
  VisualMapComponent,
  PieChart,
  DataZoomComponent,
]);

app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.$router = router;
app.config.globalProperties.$http = service;

app.use(Antd).use(router).use(store, key).use(utils);
export default app;
