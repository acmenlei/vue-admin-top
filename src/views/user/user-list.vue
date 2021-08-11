<template>
  <el-card>
    <!-- 过滤查询 -->
    <el-form inline :model="filterConditions">
      <el-form-item label="用户 ID">
        <el-input v-model="filterConditions.ll_id" placeholder="使用ID查询用户"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="filterConditions.ll_username" placeholder="使用用户名查询用户"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button icon="el-icon-search" type="primary" @click="queryUserPermissionList">查询</el-button>
          <el-button icon="el-icon-refresh-left" type="success" @click="resetUserList">重置</el-button>
          <el-button icon="el-icon-circle-plus-outline" type="danger" @click="$router.push('/user/edit')">新增角色</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <!-- 数据展示 -->
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column label="权限" align="center" type="expand">
        <template slot-scope="{ row }">
          <el-tree :data="row.ll_permission" :props="defaultProps"></el-tree>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户 ID" prop="ll_id"> </el-table-column>
      <el-table-column align="center" label="用户名" prop="ll_username"> </el-table-column>
      <el-table-column align="center" label="邮箱" prop="ll_email"> </el-table-column>
      <el-table-column align="center" label="用户描述" prop="ll_description">
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="270">
        <template slot-scope="{row}">
          <el-button-group>
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
          <el-button
            @click="selectModalbox(row.ll_id)"
            type="warning"
            icon="el-icon-setting"
            >分配权限</el-button
          >
        </el-button-group>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="my-page"
      @current-change="handleCurrentChange"
      :current-page="filterConditions.pageNum"
      :page-size="filterConditions.pageSize"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <!-- 权限分配弹框 -->
    <el-dialog title="权限分配" :visible.sync="dialogVisible" width="40%">
      <el-tree :data="permissionRouters"
               show-checkbox
               default-expand-all
               ref="tree"
               node-key="ll_permission_val"
               :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAllocation">取 消</el-button>
        <el-button type="primary" @click="allocationPermissions">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { queryUserPermissionList, queryUserById, allocationPermissions } from "@/api/permission";
import { permissionRouters } from "../../permission"
import { errorMessage, successMessage } from "@/common/message"

export default {
  name: "user-list",
  data() {
    return {
      permissionRouters,
      tableData: [],
      dialogVisible: false,
      filterConditions: {
        pageNum: 1,
        pageSize: 10,
        ll_username: null,
        ll_id: null
      },
      total: 0,
      defaultProps: {
        children: "ll_children",
        label: "ll_permission_name",
      },
      currentUserId: null, // 当前选择的用户Id
    };
  },
  activated() {
    this.queryUserPermissionList();
  },
  computed: {
    treeNode() {
      return this.$refs.tree;
    }
  },
  methods: {
    async queryUserPermissionList() {
      const { data, total } = await queryUserPermissionList(
        this.filterConditions
      );
      this.tableData = data;
      this.total = total;
    },
    // 重置用户显示列表
    resetUserList() {
      this.filterConditions = {
        pageNum: 1,
        pageSize: 10,
        ll_username: null,
        ll_id: null
      }
      this.queryUserPermissionList()
    },
    // 分页处理
    handleCurrentChange(pageNum) {
      this.filterConditions.pageNum = pageNum;
      this.queryUserPermissionList();
    },
    // 权限分配选择
    async selectModalbox(recordId) {
      this.dialogVisible = true;
      const { data } = await queryUserById({ ll_id: recordId }); // 获取当前用户权限
      const { ll_id, ll_permission } = data;
      // 保存当前操作用户的Id
      this.currentUserId = ll_id;
      let permissionMenus = []
      // 过滤一级权限（排除工作台）
      ll_permission.forEach(menuItem => {
        if(this.treeNode.getNode(menuItem).level == 2 || menuItem == 'workTower') {
          permissionMenus.push(menuItem)
        }
      });
      // 设置权限菜单目录
      this.treeNode.setCheckedKeys(permissionMenus);
    },
    // 分配权限 
    async allocationPermissions() {
      const { treeNode } = this;
      let leafKeys = treeNode.getCheckedKeys(); // 拿到叶子节点
      let halfKeys = treeNode.getHalfCheckedKeys(); // 拿到父节点
      let ll_permission = leafKeys.concat(halfKeys).join(','); // 拼接权限用逗号分隔（半选中节点后端也需要）
      const { code, msg } = await allocationPermissions({ ll_id: this.currentUserId, ll_permission })
      if(code == 200) {
        successMessage(msg); // 给出成功提示
        this.dialogVisible = false;
        this.currentUserId = null;
        this.queryUserPermissionList()
      } else {
        errorMessage(msg);
      }
    },
    cancelAllocation() {
      this.dialogVisible = false;
      this.currentUserId = null;
    }
  },
};
</script>

<style scoped>
</style>