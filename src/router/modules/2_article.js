import layout from "@/layout";
export default {
    path: "/article",
    name: "创作中心",
    meta: {
        code: "creativeCenter",
        onlyOne: false,
        icon: "el-icon-edit-outline",
    },
    component: layout,
    children: [{
            path: "/article/list",
            name: "文章查看",
            meta: {
                hidden: false,
                code: "articleList",
                icon: "el-icon-view",
            },
            component: () =>
                import("@/views/article/article-list.vue"),
        },
        {
            path: "/article/edit",
            name: "发布文章",
            meta: {
                hidden: false,
                code: "articleEdit",
                icon: "el-icon-edit",
            },
            component: () =>
                import("@/views/article/article-edit.vue"),
        },
    ],
};