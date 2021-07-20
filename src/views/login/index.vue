<template>
  <div class="container">
    <el-card id="login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item>
          <h3>测试管理台</h3>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入帐号"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      rules: {
        username: [
          {
            max: 11,
            min: 11,
            message: "请输入有效的账号",
            trigger: "blur",
            required: true,
          },
        ],
        password: [
          {
            max: 16,
            min: 8,
            message: "请输入有效的密码",
            trigger: "blur",
            required: true,
          },
        ],
      },
      ruleForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      /* 登录请求 */
    },
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/images/background.jpg");
  background-size: 100% 100%;
}
#login {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>