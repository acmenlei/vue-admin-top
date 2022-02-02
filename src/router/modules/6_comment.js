import layout from "@/layout";
export default {
  path: "/commentBoard",
  name: "留言板",
  meta: {
    code: "commentBoard",
    onlyOne: false,
    icon: "el-icon-edit-outline",
  },
  component: layout,
  children: [{
    path: "/commentBoard/list",
    name: "留言列表",
    meta: {
      hidden: false,
      code: "commentBoardList",
      icon: "el-icon-view",
    },
    component: () =>
      import("@/views/board/index.vue"),
  },
  {
    path: "/commentBoard/replyList",
    name: "回复列表",
    meta: {
      hidden: true,
      code: "commentBoardReplyList",
      icon: "el-icon-view",
    },
    component: () =>
      import("@/views/board/reply-list.vue"),
  }
  ],
};