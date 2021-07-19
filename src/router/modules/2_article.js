import layout from "@/layout";
export default {
  path: "/article",
  name: "创作中心",
  onlyOne: false,
  icon: "el-icon-edit-outline",
  component: layout,
  children: [
    {
      path: "/article/list",
      name: "文章查看",
      hidden: false,
      icon: "el-icon-view",
      component: () => import("@/views/article/article-list.vue"),
    },
    {
      path: "/article/edit",
      hidden: false,
      name: "发布文章",
      icon: "el-icon-edit",
      component: () => import("@/views/article/article-edit.vue"),
    },
  ],
};
