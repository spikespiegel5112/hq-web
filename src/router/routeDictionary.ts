import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";

const routerDictionary = [
  {
    label: "首页",
    title: "首页",
    path: "Dashboard",
    name: "Dashboard",
    icon: () => h(PieChartOutlined),
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "../views/Dashboard/Dashboard.vue"
      ),
  },
  {
    label: "区域小时客流",
    title: "区域小时客流",
    path: "RegionalHourlyPassengerFlow",
    name: "RegionalHourlyPassengerFlow",
    icon: () => h(PieChartOutlined),
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "../views/Dashboard/Dashboard.vue"
      ),
  },
  {
    label: "区域实时客流",
    title: "区域实时客流",
    path: "RegionalHourlyPassengerFlow",
    name: "RegionalHourlyPassengerFlow",
    icon: () => h(PieChartOutlined),
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "../views/Dashboard/Dashboard.vue"
      ),
  },
  {
    label: "事件管理",
    title: "事件管理",
    path: "EventManagement",
    name: "EventManagement",
    icon: () => h(PieChartOutlined),
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "../views/Dashboard/Dashboard.vue"
      ),
  },
  {
    label: "信息管理",
    title: "信息管理",
    path: "InformationManagement",
    name: "InformationManagement",
    icon: () => h(PieChartOutlined),
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "../views/Dashboard/Dashboard.vue"
      ),
  },
  {
    label: "运行管理",
    title: "运行管理",
    path: "OperationManagement",
    name: "OperationManagement",
    icon: () => h(PieChartOutlined),
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "../views/Dashboard/Dashboard.vue"
      ),
  },
  {
    label: "报表管理",
    title: "报表管理",
    path: "ReportManagement",
    name: "ReportManagement",
    icon: () => h(PieChartOutlined),
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "../views/Dashboard/Dashboard.vue"
      ),
  },
  {
    label: "系统管理",
    title: "系统管理",
    path: "InformationManagement",
    name: "SystemManagement",
    icon: () => h(PieChartOutlined),
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "../views/Dashboard/Dashboard.vue"
      ),
  },
] as any[];

export default routerDictionary;
