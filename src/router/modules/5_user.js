import layout from "@/layout";
export default {
    path: "/user",
    name: "用户管理",
    meta: {
        code: "userManage",
        onlyOne: false,
        icon: "el-icon-user-solid",
    },
    component: layout,
    children: [{
            path: "/user/list",
            name: "用户列表",
            meta: {
                code: "userList",
                hidden: false,
                icon: "el-icon-user",
            },
            component: () =>
                import("@/views/user/user-list.vue"),
        },
        {
            path: "/user/edit",
            name: "新增用户",
            meta: {
                hidden: false,
                code: "userEdit",
                icon: "el-icon-s-tools",
            },
            component: () =>
                import("@/views/user/user-edit.vue"),
        },
    ],
};