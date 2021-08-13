import { queryAllPermissions } from "@/api/permission"

export default {
    data() {
        return {
            permissionRouters: [],
            defaultProps: {
                children: "ll_children",
                label: "ll_permission_name",
            },
        }
    },
    methods: {
        // 查询所有权限
    async queryAllPermissions() {
        const { data } = await queryAllPermissions();
        this.permissionRouters = data;
      },
    }
}