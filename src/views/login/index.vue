<template>
  <div class="container">
    <el-card id="login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="loginForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item>
          <h3>测试管理台</h3>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.ll_username"
            prefix-icon="el-icon-user"
            placeholder="请输入帐号"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.ll_password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            type="primary"
            @click="login('loginForm')"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { VALIDATE_ERROR, NETWORK_ERROR } from "@/common/tips";
import { errorMessage } from "@/common/message";
import { adminLogin } from "@/api/user";

export default {
  name: "login",
  data() {
    return {
      rules: {
        ll_username: [
          {
            max: 11,
            min: 11,
            message: "请输入有效的账号",
            trigger: "blur",
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
      },
      ruleForm: {
        ll_username: "",
        ll_password: "",
      },
    };
  },
  methods: {
    /* 登录请求 */
    async login(form) {
      try {
        await this.$refs[form].validate(); // 验证通过
      } catch {
        return errorMessage(VALIDATE_ERROR);
      }
      try {
        const { code, msg } = await adminLogin(this.ruleForm);
        if ( code == 200) {
          this.$store.dispatch('user/login'); // 处理本地存储问题
          this.$router.push("/home");
        } else {
          return errorMessage(msg);
        }
      } catch(e) {
        errorMessage(NETWORK_ERROR);
      }
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