import layout from "@/layout";
export default {
    path: "/category",
    name: "分类管理",
    onlyOne: false,
    icon: "el-icon-s-data",
    component: layout,
    children: [{
            path: "/category/list",
            name: "分类列表",
            hidden: false,
            icon: "el-icon-view",
            component: () =>
                import ("@/views/category/category-list.vue"),
        },
        {
            path: "/category/edit",
            hidden: false,
            name: "新增分类",
            icon: "el-icon-edit",
            component: () =>
                import ("@/views/category/category-edit.vue"),
        },
    ],
};