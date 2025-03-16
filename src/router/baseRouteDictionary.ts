const baseRouteDictionary = [
  {
    title: "登录",
    path: "/Login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/Login.vue"),
  },
  // {
  //   path: "/",
  //   name: "Layout",
  //   componentPath: "@/views/RouterView.vue",
  //   redirect: "/Dashboard",
  //   component: () =>
  //     import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
  //   children: [],
  // },
] as any[];

export default baseRouteDictionary;
