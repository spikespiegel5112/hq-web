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
    label: "登录",
    title: "登录",
    path: "/Login",
    name: "Login",
    icon: () => h(PieChartOutlined),
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/Login.vue"),
  },
  {
    path: "/",
    name: "layout",
    redirect: "/dashboard",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "../views/Layout.vue"),
    children: [
      {
        label: "首页",
        title: "首页",
        path: "Dashboard",
        name: "Dashboard",
        icon: () => h(PieChartOutlined),
        component: () =>
          import(
            /* webpackChunkName: "Dashboard" */ "@/views/Dashboard/Dashboard.vue"
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
            /* webpackChunkName: "Dashboard" */ "@/views/Dashboard/Dashboard.vue"
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
            /* webpackChunkName: "Dashboard" */ "@/views/Dashboard/Dashboard.vue"
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
            /* webpackChunkName: "Dashboard" */ "@/views/Dashboard/Dashboard.vue"
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
            /* webpackChunkName: "Dashboard" */ "@/views/Dashboard/Dashboard.vue"
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
            /* webpackChunkName: "Dashboard" */ "@/views/Dashboard/Dashboard.vue"
          ),
      },
      {
        label: "报表管理",
        title: "报表管理",
        path: "SheetManagement",
        name: "SheetManagement",
        icon: () => h(PieChartOutlined),
        component: () =>
          import(
            /* webpackChunkName: "Dashboard" */ "@/views/Dashboard/Dashboard.vue"
          ),
        children: [
          {
            label: "事件报表",
            title: "事件报表",
            path: "EventSheet",
            name: "EventSheet",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
          },
          {
            label: "事件报表",
            title: "事件报表",
            path: "EventSheet",
            name: "EventSheet",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
          },
          {
            label: "事件报表",
            title: "事件报表",
            path: "EventSheet",
            name: "EventSheet",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
          },
          {
            label: "投诉报表",
            title: "投诉报表",
            path: "ComplaintSheet",
            name: "ComplaintSheet",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
          },
          {
            label: "舆情报表",
            title: "舆情报表",
            path: "PublicOpinionSheet",
            name: "PublicOpinionSheet",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
          },
          {
            label: "地铁月报表",
            title: "地铁月报表",
            path: "SubwaySheetByMonth",
            name: "SubwaySheetByMonth",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
          },
          {
            label: "客流月报表",
            title: "客流月报表",
            path: "PassengerFlowSheetByMonth",
            name: "PassengerFlowSheetByMonth",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
          },
        ],
      },
      {
        label: "系统管理",
        title: "系统管理",
        path: "InformationManagement",
        name: "SystemManagement",
        icon: () => h(PieChartOutlined),
        component: () =>
          import(
            /* webpackChunkName: "Dashboard" */ "@/views/Dashboard/Dashboard.vue"
          ),
      },
    ],
  },
] as any[];

export default routerDictionary;
