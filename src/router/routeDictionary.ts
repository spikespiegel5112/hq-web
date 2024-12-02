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
        title: "首页",
        path: "Dashboard",
        name: "Dashboard",
        icon: () => h(PieChartOutlined),
        component: () =>
          import(
            /* webpackChunkName: "Dashboard" */ "@/views/Dashboard/Dashboard.vue"
          ),
        meta: {
          title: "首页",
        },
      },
      {
        title: "区域小时客流",
        path: "RegionalHourlyPassengerFlow",
        name: "RegionalHourlyPassengerFlow",
        icon: () => h(PieChartOutlined),
        component: () =>
          import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),

        children: [
          {
            title: "高铁小时到达",
            path: "HighSpeedRailArrivesWithinHours",
            name: "HighSpeedRailArrivesWithinHours",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(
                /* webpackChunkName: "HighSpeedRailArrivesWithinHours" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
              ),
            meta: {
              title: "高铁小时到达",
            },
          },
          {
            title: "出租车",
            path: "Taxi",
            name: "Taxi",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(
                /* webpackChunkName: "Taxi" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
              ),
            meta: {
              title: "出租车",
            },
          },
          {
            title: "地铁",
            path: "Subway",
            name: "Subway",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(
                /* webpackChunkName: "Subway" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
              ),
            meta: {
              title: "地铁",
            },
          },
          {
            title: "车库流量信息",
            path: "GarageTrafficInformation",
            name: "GarageTrafficInformation",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(
                /* webpackChunkName: "GarageTrafficInformation" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
              ),
            meta: {
              title: "车库流量信息",
            },
          },
        ],
      },
      {
        title: "区域实时客流",
        path: "RegionalReakTimePassengerFlow",
        name: "RegionalReakTimePassengerFlow",
        icon: () => h(PieChartOutlined),
        component: () =>
          import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
        children: [
          {
            title: "出租车",
            path: "HighSpeedRailArrivesWithinHoursTaxi",
            name: "HighSpeedRailArrivesWithinHoursTaxi",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(
                /* webpackChunkName: "Taxi" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
              ),
            meta: {
              title: "出租车",
            },
          },
          {
            title: "停车库",
            path: "ParkingGarage",
            name: "ParkingGarage",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(
                /* webpackChunkName: "ParkingGarage" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
              ),
            meta: {
              title: "停车库",
            },
          },
        ],
      },
      {
        title: "事件管理",
        path: "EventManagement",
        name: "EventManagement",
        icon: () => h(PieChartOutlined),
        component: () =>
          import(
            /* webpackChunkName: "RegionalHourlyPassengerFlow" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
          ),
      },
      {
        title: "信息管理",
        path: "InformationManagement",
        name: "InformationManagement",
        icon: () => h(PieChartOutlined),
        component: () =>
          import(
            /* webpackChunkName: "RegionalHourlyPassengerFlow" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
          ),
      },
      {
        title: "运行管理",
        path: "OperationManagement",
        name: "OperationManagement",
        icon: () => h(PieChartOutlined),
        component: () =>
          import(
            /* webpackChunkName: "RegionalHourlyPassengerFlow" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
          ),
      },
      {
        title: "报表管理",
        path: "SheetManagement",
        name: "SheetManagement",
        icon: () => h(PieChartOutlined),
        component: () =>
          import(
            /* webpackChunkName: "RegionalHourlyPassengerFlow" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
          ),
        children: [
          {
            title: "事件报表",
            path: "EventSheet",
            name: "EventSheet",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
            meta: {
              title: "事件报表",
            },
          },
          {
            title: "事件报表",
            path: "EventSheet",
            name: "EventSheet",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
            meta: {
              title: "事件报表",
            },
          },
          {
            title: "事件报表",
            path: "EventSheet",
            name: "EventSheet",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
            meta: {
              title: "事件报表",
            },
          },
          {
            title: "投诉报表",
            path: "ComplaintSheet",
            name: "ComplaintSheet",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
            meta: {
              title: "投诉报表",
            },
          },
          {
            title: "舆情报表",
            path: "PublicOpinionSheet",
            name: "PublicOpinionSheet",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
            meta: {
              title: "舆情报表",
            },
          },
          {
            title: "地铁月报表",
            path: "SubwaySheetByMonth",
            name: "SubwaySheetByMonth",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
            meta: {
              title: "地铁月报表",
            },
          },
          {
            title: "客流月报表",
            path: "PassengerFlowSheetByMonth",
            name: "PassengerFlowSheetByMonth",
            icon: () => h(PieChartOutlined),
            component: () =>
              import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
            meta: {
              title: "客流月报表",
            },
          },
        ],
      },
      {
        title: "系统管理",
        path: "InformationManagement",
        name: "SystemManagement",
        icon: () => h(PieChartOutlined),
        component: () =>
          import(
            /* webpackChunkName: "RegionalHourlyPassengerFlow" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
          ),
      },
    ],
  },
] as any[];

export default routerDictionary;
