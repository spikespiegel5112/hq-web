const systemRouteDictionary = [
  {
    title: "首页",
    path: "Dashboard",
    name: "Dashboard",
    icon: "/src/assets/menu_dashboard.png",
    componentPath: "@/views/Dashboard/Dashboard.vue",
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "@/views/Dashboard/Dashboard.vue"
      ),
    meta: {
      title: "首页",
    },
  },
  {
    title: "客流数据管理",
    path: "/PassengerFlowDataManagement",
    name: "PassengerFlowDataManagement",
    icon: "/src/assets/menu_passengerflowdatamanagement.png",
    component: () =>
      import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
    children: [
      {
        title: "高铁客流",
        path: "HighSpeedRailArrivesWithinHours",
        name: "HighSpeedRailArrivesWithinHours",
        component: () =>
          import(
            /* webpackChunkName: "HighSpeedRailArrivesWithinHours" */ "@/views/PassengerFlowDataManagement/HighSpeedRailArrivesWithinHours/HighSpeedRailArrivesWithinHours.vue"
          ),
        meta: {
          title: "高铁客流",
        },
      },
      {
        title: "出租车",
        path: "Taxi",
        name: "Taxi",
        component: () =>
          import(
            /* webpackChunkName: "Taxi" */ "@/views/PassengerFlowDataManagement/Taxi/Taxi.vue"
          ),
        meta: {
          title: "出租车",
        },
      },
      {
        title: "网约车",
        path: "OnlineCarHailing",
        name: "OnlineCarHailing",
        component: () =>
          import(
            /* webpackChunkName: "OnlineCarHailing" */ "@/views/PassengerFlowDataManagement/OnlineCarHailing/OnlineCarHailing.vue"
          ),
        meta: {
          title: "网约车",
        },
      },
      {
        title: "地铁",
        path: "Subway",
        name: "Subway",
        component: () =>
          import(
            /* webpackChunkName: "Subway" */ "@/views/PassengerFlowDataManagement/Subway/Subway.vue"
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
            /* webpackChunkName: "GarageTrafficInformation" */ "@/views/PassengerFlowDataManagement/GarageTrafficInformation/GarageTrafficInformation.vue"
          ),
        meta: {
          title: "车库流量信息",
        },
      },
      {
        title: "区域人数统计",
        path: "RegionalPopulationStatistics",
        name: "RegionalPopulationStatistics",
        component: () =>
          import(
            /* webpackChunkName: "RegionalPopulationStatistics" */ "@/views/PassengerFlowDataManagement/RegionalPopulationStatistics/RegionalPopulationStatistics.vue"
          ),
        meta: {
          title: "区域人数统计",
        },
      },
      {
        title: "进出人数统计",
        path: "NumberOfPeopleEnteringAndLeaving",
        name: "NumberOfPeopleEnteringAndLeaving",
        component: () =>
          import(
            /* webpackChunkName: "NumberOfPeopleEnteringAndLeaving" */ "@/views/PassengerFlowDataManagement/NumberOfPeopleEnteringAndLeaving/NumberOfPeopleEnteringAndLeaving.vue"
          ),
        meta: {
          title: "进出人数统计",
        },
      },
    ],
  },
  {
    title: "事件管理",
    path: "EmergencyEventManagement",
    name: "EmergencyEventManagement",
    icon: "/src/assets/menu_emergencyeventmanagement.png",
    component: () =>
      import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
    children: [
      {
        title: "突发事件",
        path: "EmergencyEvent",
        name: "EmergencyEvent",
        component: () =>
          import(
            /* webpackChunkName: "EmergencyEvent" */ "@/views/EmergencyEventManagement/EmergencyEvent/EmergencyEvent.vue"
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
            /* webpackChunkName: "EventLog" */ "@/views/EmergencyEventManagement/EventLog/EventLog.vue"
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
        path: "ComplaintInformation",
        name: "ComplaintInformation",
        component: () =>
          import(
            /* webpackChunkName: "ComplaintInformation" */ "@/views/InformationManagement/ComplaintInformation/ComplaintInformation.vue"
          ),
        meta: {
          title: "投诉信息",
        },
      },

      {
        title: "天气信息",
        path: "WeatherInformation",
        name: "WeatherInformation",
        component: () =>
          import(
            /* webpackChunkName: "WeatherInformation" */ "@/views/InformationManagement/WeatherInformation/WeatherInformation.vue"
          ),
        meta: {
          title: "天气信息",
        },
      },
    ],
  },
  {
    title: "预案管理",
    path: "EmergencyPlanManagement",
    name: "EmergencyPlanManagement",
    icon: "/src/assets/menu_emergencyplanmanagement.png",
    component: () =>
      import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
    children: [
      {
        title: "应急预案",
        path: "EmergencyPlan",
        name: "EmergencyPlan",
        component: () =>
          import(
            /* webpackChunkName: "EmergencyPlan" */ "@/views/EmergencyPlanManagement/EmergencyPlan/EmergencyPlan.vue"
          ),
        meta: {
          title: "应急预案",
        },
      },
      {
        title: "预案记录",
        path: "PlanRecord",
        name: "PlanRecord",
        component: () =>
          import(
            /* webpackChunkName: "PlanRecord" */ "@/views/EmergencyPlanManagement/PlanRecord/PlanRecord.vue"
          ),
        meta: {
          title: "预案记录",
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
        title: "告警信息管理",
        path: "AlarmInformationManagement",
        name: "AlarmInformationManagement",
        component: () =>
          import(
            /* webpackChunkName: "AlarmInformationManagement" */ "@/views/OperationManagement/AlarmInformationManagement/AlarmInformationManagement.vue"
          ),
        meta: {
          title: "告警信息管理",
        },
      },
      {
        title: "日历信息管理",
        path: "CalendarInformationManagement",
        name: "CalendarInformationManagement",
        component: () =>
          import(
            /* webpackChunkName: "CalendarInformationManagement" */ "@/views/OperationManagement/CalendarInformationManagement/CalendarInformationManagement.vue"
          ),
        meta: {
          title: "日历信息管理",
        },
      },
      {
        title: "阈值配置",
        path: "ConfigurationThreshold",
        name: "ConfigurationThreshold",
        component: () =>
          import(
            /* webpackChunkName: "ConfigurationThreshold" */ "@/views/OperationManagement/ConfigurationThreshold/ConfigurationThreshold.vue"
          ),
        meta: {
          title: "阈值配置",
        },
      },
      {
        title: "常用配置",
        path: "ConfigurationCommon",
        name: "ConfigurationCommon",
        component: () =>
          import(
            /* webpackChunkName: "ConfigurationCommon" */ "@/views/OperationManagement/ConfigurationCommon/ConfigurationCommon.vue"
          ),
        meta: {
          title: "阈值配置",
        },
      },
      {
        title: "地图配置",
        path: "ConfigurationMap",
        name: "ConfigurationMap",
        component: () =>
          import(
            /* webpackChunkName: "ConfigurationMap" */ "@/views/OperationManagement/ConfigurationMap/ConfigurationMap.vue"
          ),
        meta: {
          title: "地图配置",
        },
      },
    ],
  },
  {
    title: "电子预案",
    path: "ElectronicPlan",
    name: "ElectronicPlan",
    icon: "/src/assets/menu_informationmanagement.png",
    component: () =>
      import(/* webpackChunkName: "RouterView" */ "@/views/RouterView.vue"),
    children: [
      {
        title: "预案库管理",
        path: "PlanLibraryManagement",
        name: "PlanLibraryManagement",
        component: () =>
          import(
            /* webpackChunkName: "PlanLibraryManagement" */ "@/views/PlanLibraryManagement/PlanLibraryManagement.vue"
          ),
        meta: {
          title: "预案库管理",
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
] as any[];

export default systemRouteDictionary;
