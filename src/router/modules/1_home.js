import layout from "@/layout";
export default {
  path: "/",
  name: "",
  onlyOne: true,
  icon:"el-icon-s-platform",
  component: layout,
  children: [
    {
      path: "/home",
      hidden: false,
      name: "工作台",
      icon:"el-icon-s-shop",
      component: () => import("@/views/home"),
    }
  ],
};
