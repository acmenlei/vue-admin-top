const SET_PERMISSION = 'SET_PERMISSION'

const permission = {
    namespaced: true,
    state: {
        permissions: []
    },
    mutations: {
        [SET_PERMISSION]: (state, data) => state.permissions = data
    },
    actions: {
        permissionOperator({
            commit
        }, permissions) {
            commit(SET_PERMISSION, permissions)
        }
    },
    getters: {
        permissions: (state) => state.permissions
    }
}

export default permission;