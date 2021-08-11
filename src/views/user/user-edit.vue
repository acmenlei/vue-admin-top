<template>
  <el-card>
    <el-form
      ref="userInfoForm"
      :model="userInfo"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="ll_username">
        <el-input
          v-model="userInfo.ll_username"
          placeholder="输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="ll_password">
        <el-input
          type="password"
          v-model="userInfo.ll_password"
          placeholder="输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="ll_email">
        <el-input v-model="userInfo.ll_email" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="描述信息" prop="ll_description">
        <el-input
          type="textarea"
          rows="4"
          v-model="userInfo.ll_description"
          placeholder="输入描述信息..."
        ></el-input>
      </el-form-item>
      <el-form-item label="授予权限" prop="ll_permission">
        <el-tree
          :data="permissionRouters"
          show-checkbox
          default-expand-all
          ref="tree"
          @check="checkPermissions"
          node-key="ll_permission_val"
          :props="defaultProps"
        >
        </el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm('userInfoForm')"
          >确定</el-button
        >
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { permissionRouters } from "../../permission";
import { VALIDATE_ERROR } from "@/common/tips";
import { errorMessage, successMessage } from "@/common/message";
import { addAdminUser } from "@/api/user"

export default {
  name: "user-edit",
  data() {
    return {
      permissionRouters,
      defaultProps: {
        children: "ll_children",
        label: "ll_permission_name",
      },
      userInfo: {
        ll_username: null,
        ll_password: null,
        ll_email: null,
        ll_description: null,
        ll_permission: [],
      },
      rules: {
        ll_username: [
          {
            max: 11,
            min: 5,
            trigger: "blur",
            message: "请输入有效的账号",
            required: true,
          },
        ],
        ll_password: [
          {
            max: 16,
            min: 8,
            message: "请输入有效的密码",
            trigger: "blur",
            required: true,
          },
        ],
        ll_email: [
          {
            trigger: "blur",
            message: "输入邮箱",
            required: true,
          },
        ],
        ll_permission: [
          {
            type: "array",
            trigger: "blur",
            required: true,
            message: "请赋予该角色权限 最少一个工作台",
          },
        ],
      },
    };
  },
  computed: {
      userId() {
          return this.$route.query.userId
      },
      treeNode() {
          return this.$refs.tree
      }
  },
  mounted() {
     if(this.userId != undefined) {
        console.log("编辑用户信息");
     }
  },
  methods: {
      async confirm(form) {
         try {
             await this.$refs[form].validate(); // 验证通过
             let params = Object.assign({}, this.userInfo); // 拷贝数据 不影响原来的数据
             params.ll_permission = params.ll_permission.join(',');
             const { code, msg } = await addAdminUser(params);
             if(code == 200) {
                 successMessage(msg);
                 return this.$router.back();
             }
             errorMessage(msg);
         } catch {
             return errorMessage(VALIDATE_ERROR)
         }
      },
      checkPermissions(data, {checkedKeys, halfCheckedKeys}) {
          this.userInfo.ll_permission = checkedKeys.concat(halfCheckedKeys);
      }
  }
};
</script>

<style scoped>
</style>