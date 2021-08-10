import layout from "@/layout";
export default {
    path: "/category",
    name: "分类管理",
    meta: {
        code: "categoryManage",
        onlyOne: false,
        icon: "el-icon-s-data",
    },
    component: layout,
    children: [{
            path: "/category/list",
            name: "分类列表",
            meta: {
                code: "categoryList",
                hidden: false,
                icon: "el-icon-view",
            },
            component: () =>
                import("@/views/category/category-list.vue"),
        },
        {
            path: "/category/edit",
            name: "新增分类",
            meta: {
                hidden: false,
                code: "categoryEdit",
                icon: "el-icon-edit",
            },
            component: () =>
                import("@/views/category/category-edit.vue"),
        },
    ],
};