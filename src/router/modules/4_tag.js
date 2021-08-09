import layout from "@/layout";
export default {
    path: "/tag",
    name: "标签管理",
    onlyOne: false,
    icon: "el-icon-collection-tag",
    component: layout,
    children: [{
            path: "/tag/list",
            name: "标签列表",
            hidden: false,
            icon: "el-icon-view",
            component: () =>
                import ("@/views/tag/tag-list.vue"),
        },
        {
            path: "/tag/edit",
            hidden: false,
            name: "新增标签",
            icon: "el-icon-plus",
            component: () =>
                import ("@/views/tag/tag-edit.vue"),
        },
    ],
};