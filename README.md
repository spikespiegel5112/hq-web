### 全局表格组件

- 文件路径为@/components/BaseTable.vue。
- 主要接受的props参数：
  tableData：表格数据
  originalTableData：原始表格数据，用于在tableData经过加工处理后，给编辑等弹窗传递原始rowData使用，例如tableData需要显示的是处置状态的汉字，但是汉字是通过字典表比对之后的结果，当我需要编辑当前行数据时，不可能从已处理过的tableData的rowData中使用汉字，所以此时还是需要有一个拿取原始后端数据的渠道
  dataModel：表格数据模型，用于构建表格的表头，并且用于衔接tableData中的数据，表单校验配置，以及一些特殊的表格样式处理用到的配置
- 此组件设计思路为：

### 整体项目权限系统设计思路

- 思路概要：
  ->登录
  ->获取用户数据，权限数据
  ->根据权限数据遍历系统的路由索引（路由索引我分为了2个部分，baseRoute和systemRoute,baseRoute是静态路由，不受权限控制，systemRoute是动态路由，拿来权限遍历的是这部分路由）
  ->将处理过的路由索引通过addRoute方法添加到vue-router中，实现动态路由
  ->并且将每一个权限树形数据节点的权限点信息遍历到与其通过路由name配对的路由树形数据节点中，存储在路由节点信息的meta字段中
  ->执行路由守卫拦截器，next到相应的路由中
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

- 大屏项目里的@/views/Layout.vue文件，有一个initTiming()方法，负责广播当前的时间节点。此思路其实等同于集成电路里的时序或者叫心跳的概念，在固定节点的时机发出事件广播，由任意组件中的watch方法通过观察相对应的时间节点的state来订阅，例如我订阅5秒事件，那initTiming方法会在自然时间的每个整5秒广播一次事件，订阅事件的组件可用于做轮询操作。

### 关于附件组件的说明

- 管理端涉及到附件的组件有如下几个：
  @/components/CommonUpload.vue（全局上传组件）
  @/components/AttachmentReview.vue（附件预览组件，用在许多详情弹窗的附件字段中）
  @/components/AttachmentPreview.vue（附件表格预览组件，只用在BaseTable.vue文件中，用于在表格的附件列中处理附件图标用）
  @/components/PDFViewer.vue（PDF预览组件）
  @/components/VideoPlayer.vue（视频预览组件）
