const routerDictionary = [
  {
    title: "登录",
    path: "/Login",
    name: "Login",
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
        icon: "/src/assets/menu_dashboard.png",
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
        icon: "/src/assets/menu_regionalhourlypassengerflow.png",
        component: () =>
          import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
        children: [
          {
            title: "高铁",
            path: "HighSpeedRailArrivesWithinHours",
            name: "HighSpeedRailArrivesWithinHours",
            component: () =>
              import(
                /* webpackChunkName: "HighSpeedRailArrivesWithinHours" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
              ),
            meta: {
              title: "高铁",
            },
          },
          {
            title: "出租车",
            path: "Taxi",
            name: "RegionalHourlyPassengerFlowTaxi",
            component: () =>
              import(
                /* webpackChunkName: "Taxi" */ "@/views/RegionalHourlyPassengerFlow/Taxi/Taxi.vue"
              ),
            meta: {
              title: "出租车",
            },
          },
          {
            title: "地铁",
            path: "Subway",
            name: "Subway",
            component: () =>
              import(
                /* webpackChunkName: "HighSpeedRailArrivesWithinHours" */ "@/views/RegionalHourlyPassengerFlow/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
              ),
            meta: {
              title: "地铁",
            },
          },
          {
            title: "车库流量信息",
            path: "GarageTrafficInformation",
            name: "GarageTrafficInformation",
            component: () =>
              import(
                /* webpackChunkName: "GarageTrafficInformation" */ "@/views/RegionalHourlyPassengerFlow/GarageTrafficInformation/GarageTrafficInformation.vue"
              ),
            meta: {
              title: "车库流量信息",
            },
          },
        ],
      },
      {
        title: "区域实时客流",
        path: "RegionalRealTimePassengerFlow",
        name: "RegionalRealTimePassengerFlow",
        icon: "/src/assets/menu_regionalreatimepassengerflow.png",
        component: () =>
          import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
        children: [
          {
            title: "出租车",
            path: "Taxi",
            name: "RegionalRealTimePassengerFlowTaxi",
            component: () =>
              import(
                /* webpackChunkName: "Texi" */ "@/views/RegionalRealTimePassengerFlow/Taxi/Taxi.vue"
              ),
            meta: {
              title: "出租车",
            },
          },
          {
            title: "停车库",
            path: "ParkingGarage",
            name: "ParkingGarage",
            component: () =>
              import(
                /* webpackChunkName: "ParkingGarage" */ "@/views/RegionalRealTimePassengerFlow/ParkingGarage/ParkingGarage.vue"
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
        icon: "/src/assets/menu_eventmanagement.png",
        component: () =>
          import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
        children: [
          {
            title: "突发事件",
            path: "EmergencyEvent",
            name: "EmergencyEvent",
            component: () =>
              import(
                /* webpackChunkName: "EmergencyEvent" */ "@/views/EventManagement/EmergencyEvent/EmergencyEvent.vue"
              ),
            meta: {
              title: "突发事件",
            },
          },
          {
            title: "事件记录",
            path: "EventLog",
            name: "EventLog",
            component: () =>
              import(
                /* webpackChunkName: "EventLog" */ "@/views/EventManagement/EventLog/EventLog.vue"
              ),
            meta: {
              title: "事件记录",
            },
          },
        ],
      },
      {
        title: "信息管理",
        path: "InformationManagement",
        name: "InformationManagement",
        icon: "/src/assets/menu_informationmanagement.png",
        component: () =>
          import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
        children: [
          {
            title: "外部信息",
            path: "ExternalInformation",
            name: "ExternalInformation",
            component: () =>
              import(
                /* webpackChunkName: "ExternalInformation" */ "@/views/InformationManagement/ExternalInformation/ExternalInformation.vue"
              ),
            meta: {
              title: "外部信息",
            },
          },
          {
            title: "舆情信息",
            path: "PublicOpinionInformation",
            name: "PublicOpinionInformation",
            component: () =>
              import(
                /* webpackChunkName: "PublicOpinionInformation" */ "@/views/InformationManagement/PublicOpinionInformation/PublicOpinionInformation.vue"
              ),
            meta: {
              title: "舆情信息",
            },
          },
          {
            title: "投诉信息",
            path: "ExternalComplaints",
            name: "ExternalComplaints",
            component: () =>
              import(
                /* webpackChunkName: "ExternalComplaints" */ "@/views/InformationManagement/ExternalComplaints/ExternalComplaints.vue"
              ),
            meta: {
              title: "投诉信息",
            },
          },
        ],
      },
      {
        title: "运行管理",
        path: "OperationManagement",
        name: "OperationManagement",
        icon: "/src/assets/menu_operationmanagement.png",
        component: () =>
          import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
        children: [
          {
            title: "值班人员管理",
            path: "PersonOnDutyManagement",
            name: "PersonOnDutyManagement",
            component: () =>
              import(
                /* webpackChunkName: "PersonOnDutyManagement" */ "@/views/OperationManagement/PersonOnDutyManagement/PersonOnDutyManagement.vue"
              ),
            meta: {
              title: "值班人员管理",
            },
          },
          {
            title: "指示灯",
            path: "IndicatorLights",
            name: "IndicatorLights",
            component: () =>
              import(
                /* webpackChunkName: "IndicatorLights" */ "@/views/OperationManagement/IndicatorLights/IndicatorLights.vue"
              ),
            meta: {
              title: "指示灯",
            },
          },
          {
            title: "配置",
            path: "OperationManagementConfiguration",
            name: "OperationManagementConfiguration",
            component: () =>
              import(
                /* webpackChunkName: "OperationManagementConfiguration" */ "@/views/OperationManagement/OperationManagementConfiguration/OperationManagementConfiguration.vue"
              ),
            meta: {
              title: "指示灯",
            },
          },
        ],
      },
      {
        title: "报表管理",
        path: "SheetManagement",
        name: "SheetManagement",
        icon: "/src/assets/menu_sheetmanagement.png",
        component: () =>
          import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
        children: [
          {
            title: "事件报表",
            path: "EventSheet",
            name: "EventSheet",
            component: () =>
              import(
                /* webpackChunkName: "EventSheet" */ "@/views/SheetManagement/EventSheet/EventSheet.vue"
              ),
            meta: {
              title: "事件报表",
            },
          },

          {
            title: "投诉报表",
            path: "ComplaintSheet",
            name: "ComplaintSheet",
            component: () =>
              import(
                /* webpackChunkName: "ComplaintSheet" */ "@/views/SheetManagement/ComplaintSheet/ComplaintSheet.vue"
              ),
            meta: {
              title: "投诉报表",
            },
          },
          {
            title: "舆情报表",
            path: "PublicOpinionSheet",
            name: "PublicOpinionSheet",
            component: () =>
              import(
                /* webpackChunkName: "PublicOpinionSheet" */ "@/views/SheetManagement/PublicOpinionSheet/PublicOpinionSheet.vue"
              ),
            meta: {
              title: "舆情报表",
            },
          },
          {
            title: "地铁月报表",
            path: "MonthlySubwaySheet",
            name: "MonthlySubwaySheet",
            component: () =>
              import(
                /* webpackChunkName: "MonthlySubwaySheet" */ "@/views/SheetManagement/MonthlySubwaySheet/MonthlySubwaySheet.vue"
              ),
            meta: {
              title: "地铁月报表",
            },
          },
          {
            title: "客流月报表",
            path: "MonthlyPassengerFlowSheet",
            name: "MonthlyPassengerFlowSheet",
            component: () =>
              import(
                /* webpackChunkName: "MonthlyPassengerFlowSheet" */ "@/views/SheetManagement/MonthlyPassengerFlowSheet/MonthlyPassengerFlowSheet.vue"
              ),
            meta: {
              title: "客流月报表",
            },
          },
        ],
      },
      {
        title: "系统管理",
        path: "SystemManagement",
        name: "SystemManagement",
        icon: "/src/assets/menu_systemmanagement.png",
        component: () =>
          import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
        children: [
          {
            title: "用户管理",
            path: "UserManagement",
            name: "UserManagement",
            component: () =>
              import(
                /* webpackChunkName: "UserManagement" */ "@/views/SystemManagement/UserManagement/UserManagement.vue"
              ),
            meta: {
              title: "用户管理",
            },
          },
          {
            title: "角色管理",
            path: "RoleManagement",
            name: "RoleManagement",
            component: () =>
              import(
                /* webpackChunkName: "RoleManagement" */ "@/views/SystemManagement/RoleManagement/RoleManagement.vue"
              ),
            meta: {
              title: "角色管理",
            },
          },
          {
            title: "菜单管理",
            path: "MenuManagement",
            name: "MenuManagement",
            component: () =>
              import(
                /* webpackChunkName: "MenuManagement" */ "@/views/SystemManagement/MenuManagement/MenuManagement.vue"
              ),
            meta: {
              title: "菜单管理",
            },
          },
          {
            title: "权限管理",
            path: "PermissionManagement",
            name: "PermissionManagement",
            component: () =>
              import(
                /* webpackChunkName: "PermissionManagement" */ "@/views/SystemManagement/PermissionManagement/PermissionManagement.vue"
              ),
            meta: {
              title: "权限管理",
            },
          },
          {
            title: "字典参数管理",
            path: "DictionaryManagement",
            name: "DictionaryManagement",
            component: () =>
              import(
                /* webpackChunkName: "DictionaryManagement" */ "@/views/SystemManagement/DictionaryManagement/DictionaryManagement.vue"
              ),
            meta: {
              title: "字典参数管理",
            },
          },
        ],
      },
    ],
  },
] as any[];

export default routerDictionary;
