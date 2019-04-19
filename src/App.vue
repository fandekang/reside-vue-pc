<template>
  <div style="height: 100%;">
    <template v-if="dialogVisible">
      <el-dialog title="登录" :close-on-click-modal="false" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
        <login @verifyLogin="verifyLogin"></login>
      </el-dialog>
    </template>

    <el-container v-else>
      <el-header>
        <h1 class="title">居住证办理</h1>
        <div class="main">
          <div class="name">你好，{{name}}</div>
          <el-button type="text" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <Menu ref="menu"></Menu>
        </el-aside>
        <el-main>
          <section class="main-wrapper">
            <p class="menu-name">{{menuItemName}}</p>
            <div class="menu-content-wrapper">
              <router-view @defaultActive="defaultActive"></router-view>
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
      name: '',
      dialogVisible: false
    };
  },
  computed: {
    menuItemName() {
      return this.$store.state.moduleHead.menuItemName
    }
  },
  mounted() {
  },
  created() {
    this.isLogin();
    // this.$router.push('/')
    this.$router.push('/task-processing?actType=2')
    // this.$router.push('/task-create?actType=3')
  },
  methods: {
    // 改变侧边菜单栏的选中项
    defaultActive() {
      this.$refs.menu.$refs.menu.$refs.menuWrapper.activeIndex = '/task-processing?actType=2'
    },
    // 退出
    logout() {
      this.$http.get(process.env.ROOT_API + 'login/loginOut')
      .then(
        res => {
          res = JSON.parse(res.bodyText)
          if (res.success) {
            this.dialogVisible = true
          } else {
            this.$message.error("退出登录失败");
          }
        },
        err => {
          this.$message.error("退出登录失败");
          throw new Error(err)
        }
      )
    },
    // 登录组件传过来的值 true/false
    verifyLogin(option) {
      if (!option.dialogVisible) {
        this.name = option.name
        this.$router.push('/task-processing?actType=2')
      }
      this.dialogVisible = option.dialogVisible
    },
    // 验证是否登录过
    isLogin() {
      this.$http
        .get(
          process.env.ROOT_API + "login/getLoginName?random=" + Math.random()
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText)
            if (res.success) {
              this.$message({
                type: "success",
                message: "验证登陆成功"
              });
              this.name = res.data
              this.dialogVisible = false;
            } else {
              this.dialogVisible = true;
            }
          },
          err => {
            this.$message.error("请求验证登录接口失败");
            throw new Error(err);
          }
        );
    },
    // 关闭登录框
    handleClose() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style>
.el-table::before {
  background: transparent !important;
}
.el-table__fixed-right::before, .el-table__fixed::before {
  background: transparent !important;
}
</style>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  background: rgba(215, 215, 215, 1);
  color: #333;
  .el-header {
    display: flex;
    padding: 0;
    line-height: 60px;
    background: rgb(63, 60, 76);
    color: #fff;
    .title {
      margin: 0;
      width: 200px;
      height: 59px;
      text-align: center;
      // background: rgba(131, 81, 208, 1);
      // border-bottom: 1px solid rgba(248, 248, 248, 1);
    }
    .main {
      display: flex;
      justify-content: space-between;
      flex: 1;
      padding: 0 20px;
      height: 100%;
      line-height: 60px;
      background: rgb(63, 60, 76);
      .name {
        height: 100%;
      }
      .el-button--text {
        padding-left: 20px;
        padding-right: 20px;
        color: #fff;
      }
      // .el-button--text:hover {
      //   background: rgba(24, 139, 247, 1);
      //   color: #fff;
      // }
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
