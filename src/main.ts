// import "normalize.css";

import "@/style/common.scss";
// import "@/style/antd.scss";
import app from "@/utils/appInstance";
import "@/utils/permission.ts";
import "@/utils/navigationGuards.ts";

app.mount("#app");

export default app;
