import layout from "@/layout";
export default {
    path: "/",
    name: "",
    meta: {
        onlyOne: true,
        code: "workTower",
        icon: "el-icon-s-platform"
    },
    component: layout,
    children: [{
        path: "/home",
        name: "工作台",
        meta: {
            hidden: false,
            code: 'workTower',
            icon: "el-icon-s-shop",
        },
        component: () =>
            import("@/views/home"),
    }],
};