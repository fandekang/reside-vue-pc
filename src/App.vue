<template>
  <div style="height: 100%;">
    <el-dialog title="登录" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <login></login>
    </el-dialog>
    <el-container v-if="!dialogVisible">
      <el-header>
        <h1 class="title">居住证办理</h1>
        <div class="main">
          <div class="name">你好，办理人员</div>
          <el-button type="text" @click="open">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <Menu></Menu>
        </el-aside>
        <el-main>
          <section class="main-wrapper">
            <p class="menu-name">menu item name</p>
            <div class="menu-content-wrapper">
              <router-view></router-view>
            </div>
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import login from "@/components/layout/login";
import Menu from "@/components/layout/menu";

export default {
  name: "App",
  components: {
    login,
    Menu
  },
  data() {
    return {
      // dialogVisible: this.$store.moduleLogin.loginVisible
      dialogVisible: false
    };
  },
  computed: {},
  mounted() {
    // this.isLogin();
    // this.$router.replace("/task-processing");
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    // 是否登录过
    isLogin() {
      this.$http.get(process.env.ROOT_API + "login/getLoginName").then(
        res => {
          if (res.success) {
            this.$message({
              type: "info",
              message: "登陆成功"
            });
            // this.$store.commit("toggleLoginShow", { login: false });
            // this.$store.commit("toggleAppShow", { login: true });
          } else {
            this.$message({
              type: "error",
              message: "登陆失败"
            });
            // this.$store.commit("toggleLoginShow", { login: true });
            // this.$store.commit("toggleAppShow", { login: false });
          }
        },
        err => {
          alert("请求验证登录接口失败");
          throw new Error(err);
        }
      );
    },
    handleClose() {
      alert("XXX");
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  background: rgba(215, 215, 215, 1);
  color: #333;
  .el-header {
    display: flex;
    padding: 0;
    line-height: 60px;
    .title {
      margin: 0;
      width: 200px;
      height: 59px;
      text-align: center;
      background: rgba(131, 81, 208, 1);
      color: #fff;
      border-bottom: 1px solid rgba(248, 248, 248, 1);
    }
    .main {
      display: flex;
      justify-content: space-between;
      flex: 1;
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      background: rgba(226, 226, 226, 1);
      .name {
        height: 100%;
      }
      .el-button--text {
        padding-left: 20px;
        padding-right: 20px;
      }
      .el-button--text:hover {
        background: rgba(24, 139, 247, 1);
        color: #fff;
      }
    }
  }
  .el-container {
    .el-aside {
      width: 200px !important;
      background: rgba(131, 81, 208, 1);
    }
    .el-main {
      display: flex;
      .main-wrapper {
        display: flex;
        flex: 1;
        flex-direction: column;
        background: rgba(255, 255, 255, 1);
        .menu-name {
          margin: 10px auto;
          padding: 10px;
          width: 90%;
          box-sizing: border-box;
          background: rgba(242, 242, 242, 1);
        }
        .menu-content-wrapper {
          margin: 0 auto;
          width: 90%;
          flex: 1;
        }
      }
    }
  }
}
</style>
