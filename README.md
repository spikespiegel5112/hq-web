### 关于字典表获取

- 思路：在Layout组件中先调用global.$getAllDictionary()方法，缓存所有字典表数据，之后才会开启layout的routerView显示业务内容。业务内容中调用global.$getDictionary()方法从缓存中获取字典表数据。

### 关于环境变量

- 管理端和大屏都带有.env.development，.env.test.env.production三个文件，分别对应开发、测试、生产环境的环境变量配置
- 在package.json中，通过:test别名，即可采用test环境的环境变量，开发和打包都适用此方法

### 全局表格组件

- 文件路径为@/components/BaseTable.vue。
- 主要接受的props参数：
  tableData：表格数据
  originalTableData：原始表格数据，例如tableData需要显示的是处置状态的汉字，但是汉字是通过字典表比对之后的结果，当我需要编辑当前行数据时，不可能从已处理过的tableData的rowData中使用汉字，所以此时还是需要有一个拿取原始后端数据的渠道
  dataModel：表格数据模型，用于构建表格的表头，并且用于衔接tableData中的数据，表单校验配置，以及一些特殊的表格样式处理用到的配置
- 此组件设计思路为：通过dataModal作为一个综合性的索引信息，同时兼顾配置一系列列表相关的配置，包括：
  表头文字，
  配置列宽度，
  文字对齐方向，
  如果需要，在针对表格对应行的编辑操作中，配置表单校验设置的作用，主要是设置此字段是否必填,
  以及结合tableData数据，显示列表数据的作用。
- 对于二次加工表格数据的处理问题：
  通过originalTableData传递原始未处理的表格数据用于给编辑等弹窗传递原始rowData使用
- 关于分页器问题：通过props.pagination控制，当传布尔值时，控制分页器显示隐藏，当传对象时，传输的是分页器的相关参数。项目中有一个全局的默认分页参数，位置在global.$store.state.app.defaultPagination中，修改此处整个项目的分页参数会被同时修改。
- 关于特殊表格样式处理的问题：
  全局表格组件中有三种特殊的字段样式处理特例：
  1 tag类型字段，当dataModel中字段配置了tagConfig对象之后，此字段会按照tag的方式显示
  2 附件类型字段，当dataModel的name为attachment时，此字段会去接收处理tableData中attachmentList字段的信息，传递到baseTable集成的AttachmentPreview组件进行附件预览
  3 操作区域，就是通过actions字段指定此表格操作区域出现的操作按钮，它会绑定一个统一的点击事件，然后在对应的回调中返回点击的操作类型name，在外部自行判断处理

### 全局结合dataModel索引进行自动化表单校验的说明

- 所有的编辑弹窗都可以接收dataModel数据来自动化处理表单校验逻辑。我在每一个需要表单校验的编辑弹窗文件中都写了一份完全相同的表单校验规则处理代码。开发者需要做的只是配置好dataModel并传入弹窗中，在弹窗相应的form-item标签下配置好name即可自动化完成表单校验的处理，自动生成rules对象。无需给form单独编写rules。

### 关于时间处理

- 采用dayjs，此插件也是新版elementui和antdesign默认使用的时间处理插件，相对于momentjs，它主要是解决了momentjs打包后体积过大的问题，api和momentjs完全相同

### 整体项目权限系统设计思路

- 思路概要：
  ->登录（Login.vue）
  ->获取用户数据，权限数据（Login.vue）或（permission.ts）
  ->根据权限数据遍历系统的路由索引（路由索引我分为了2个部分，baseRoute和systemRoute,baseRoute是静态路由，不受权限控制，systemRoute是动态路由，拿来权限遍历的是这部分路由）（permission.ts）
  ->将处理过的路由索引通过addRoute方法添加到vue-router中，实现动态路由（permission.ts）
  ->并且将每一个权限树形数据节点的权限点信息遍历到与其通过路由name配对的路由树形数据节点中，存储在路由节点信息的meta字段中（permission.ts）
  ->执行路由守卫拦截器，next到相应的路由中（navigationGuards.ts）
  ->进入实际路由后通过global.$route.meta.permissionCodeList获取当前路由的权限点信息集合，然后与想要进行比对的权限点code进行权限判断，此操作已经通过global.$getAuth()全局方法进行了封装简化
  ->拿到权限判断结果，此结果为一个布尔值，用此布尔值在页面任意位置进行逻辑判断
- 相关文件：
  @/utils/permission.ts，权限获取遍历处理文件
  主要功能为：获取用户权限数据，扁平化权限树，遍历权限数据，把权限标示过的路由数据提取并且拼装成新的路由树形数据，通过addRoute方法挂载到vue-router中，形成根据权限判断过后的路由
  @/utils/navigationGuards.ts，路由守卫文件
  主要功能为：由于权限遍历已经在路由守卫钩子执行之前执行完成，所以相对于在vue2中把权限遍历和用户信息获取结合到路由守卫钩子的一体化做法，vue3的路由守卫只是比较单纯的做用户信息相关的查验判断，用于判断项目当前是否需要登出
- 全局方法：
  global.$getAuth(global, permissionCode: string)
  此方法简化的地方是，内聚了每个路由中获取global.$route的操作，省略了判断权限code必要的数组遍历方法，简化到了方法中，直接返回鉴权结果
  第一个参数需要强制把页面中的global对象传入，属于样板代码，否则无法在方法中调用global.$route对象，拿取meta.permissionCodeList数据，第二个参数就是权限点code

### 关于rem调整的问题

- 大屏和管理端都用了一个名为global.$remResizing()的方法来处理rem问题，两端此方法代码完全相同。
- global.$remResizing({
  baseline: 320,
  fontSize: 40,
  threshold: 640,
  });
  形如这样的调用方式，表示的是在320像素的屏幕宽度下，一个rem为40像素.因为rem是按照比例缩放的概念，因此，当我的屏幕宽度大于320时，一个rem所代表的像素大小也因此会等比例扩大。在实际开发中，不需要很在意最小宽度下的rem大小和实际屏幕宽度下rem大小的换算关系，因为整个项目都是由这个方法所决定的html字体大小的基础之上建立的，项目中写的所有样式，其换算方式都由此方法控制，因此不会存在rem换算标准不统一的问题。开发者只需要关注在把样式调整为同设计图一致比例的结果就可以了。

### 关于大屏轮询的思路

- 大屏项目里的@/views/Layout.vue文件，有一个initTiming()方法，负责广播当前的自然时间节点。此思路其实等同于集成电路里的时序或者叫心跳的概念，在固定节点的时机发出事件广播，由任意组件中的watch方法通过观察相对应的时间节点的state来订阅，例如我订阅5秒事件，那initTiming方法会在自然时间的每个整5秒广播一次事件，订阅事件的组件可用于做轮询操作。

### 关于附件组件的说明

- 管理端涉及到附件的组件有如下几个：
  @/components/CommonUpload.vue（全局上传组件）
  @/components/AttachmentReview.vue（附件预览组件，用在许多详情弹窗的附件字段中）
  @/components/AttachmentPreview.vue（附件表格预览组件，只用在BaseTable.vue文件中，用于在表格的附件列中处理附件图标用）
  @/components/PDFViewer.vue（PDF预览组件）
  @/components/VideoPlayer.vue（视频预览组件）

### 关于大屏弹窗功能的说明

- 大屏项目涉及到弹窗的组件如下：
  CommonRightDialog：全局弹窗外框组件，所有大屏端右侧的弹窗，都才用此组件作为模态框，内容用slot的方式填充
  ExternalInformationDialog：外部信息详情弹窗内容
  DisposalEmergencyPlanDialog：应急预案详情弹窗内容
  DisposalEmergencyEventDialog：突发事件详情弹窗内容
  InformationComplaintDialog：投诉信息详情弹窗内容
  InformationPublicOpinionDialog：舆情信息详情弹窗内容
  FileSelectorDialog：多类型附件弹窗内容
