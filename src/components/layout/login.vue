<template>
  <div style="width: 40%; margin: 0 auto;">
    <h1 style="text-align: center;">居住证办理</h1>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="70px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="form.pass" @keyup.enter.native="login" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        pass: "",
        username: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$http
        .get(
          process.env.ROOT_API +
            "login/authentication?loginname=" +
            this.form.username +
            "&password=" +
            this.form.pass
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);

            if (res.success) {
              this.$message({ type: "success", message: "登录成功" });
              this.$emit("verifyLogin", {dialogVisible: false, name: res.data});
            } else {
              this.$message.error("登录失败");
              this.$emit("verifyLogin", {dialogVisible: true});
            }
          },
          err => {
            this.$message.error("登录失败");
            throw new Error(err);
          }
        );
    }
  }
};
</script>
