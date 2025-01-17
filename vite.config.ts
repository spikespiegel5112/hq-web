import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import copyPlugin from "rollup-plugin-copy";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ViteComponents from "unplugin-vue-components/vite";
import legacy from "@vitejs/plugin-legacy";
// 使用你所使用的UI组件库的 resolver
import {
  ElementPlusResolver,
  AntDesignVueResolver,
} from "unplugin-vue-components/resolvers";

import requireTransform from "vite-plugin-require-transform";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    AutoImport({
      imports: ["vue", "vuex", "vue-router"],
      dts: "src/auto-import.d.ts",
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ViteComponents({
      resolvers: [
        ElementPlusResolver(),
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
      dts: "src/components.d.ts",
    }),
    // legacy({
    //   targets: ["ie >= 11"],
    //   additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // 可选
    //   // 下面是其他选项
    //   polyfills: ["es.promise", "es.symbol"], // 指定 polyfills
    //   modernPolyfills: true, // 添加现代浏览器所需的 polyfills
    //   // corejs: 3, // core-js 版本号
    // }),
    requireTransform(),
  ],
  resolve: {
    alias: {
      "~/": `${pathSrc}/`,
      "@/": `${pathSrc}/`,
    },
  },
  css: {
    // preprocessorOptions: {
    //   scss: {
    //     sassOptions: {
    //       // 消除启动时对过时sass API使用的报警
    //       silenceDeprecations: ["legacy-js-api"],
    //     },
    //   },
    // },
  },
  define: {
    "process.env": {},
  },
  server: {
    port: 5174,
    proxy: {
      //api是自行设置的请求前缀，任何请求路径以/api开头的请求将被代理到对应的target目标
      "/api": {
        // target: "http://10.141.18.10:9009", //目标域名
        target: "http://localhost:9009", //目标域名
        changeOrigin: true, //需要代理跨域
        rewrite: (path) => path.replace(/^\/api/, ""), //路径重写，把'/api'替换为''
      },
    },
  },
});
