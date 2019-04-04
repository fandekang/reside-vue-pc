<template>
    <div style="width: 100%; height: 100%;">
      <el-container class="login-wrapper" v-if="loginShow">
        <login></login>
      </el-container>
      <el-container v-if="appShow">
        <el-header style="background: #3F3C4C;">
          <el-row>
            <el-col :span="16"><h1 class="title">居住证办理</h1></el-col>
            <el-col :span="16"><h1 class="title">你好，{{username}</h1></el-col>
            <el-col class="logout-wrapper" :span="4"><button class="logout" @click="logout()">退出</button></el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <Menu></Menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>

      </el-container>
    </div>
</template>

<script>
import Menu from "./components/layout/Menu.vue"
import Login from "./components/layout/login/login.vue"
export default {
  name: "App",
  components: { Menu, Login },
  data() {
    return {
    }
  },
  computed: {
    username: function() {
      return this.$store.state.moduleHead.username
    },
    loginShow: function() {
      return this.$store.state.moduleHead.loginShow
    },
    appShow: function() {
      return this.$store.state.moduleHead.appShow
    }
  },
  mounted() {
    this.$http.get(process.env.ROOT_API + 'login/getLoginName')
    .then(res => {
      if (res.success) {
        this.$store.commit('toggleLoginShow', {login: false})
        this.$store.commit('toggleAppShow', {login: true})
      } else {
        this.$store.commit('toggleLoginShow', {login: true})
        this.$store.commit('toggleAppShow', {login: false})
      }
    }, err => {
      alert('请求验证登录接口失败')
      throw new Error(err)
    })
  },
  methods: {
    // 退出
    logout() {
      this.$http.get(process.env.ROOT_API + 'login/loginOut')
      .then(res => {
        if (res.success) {
          this.loginShow = true
          this.appShow = false
        }
        else {
          this.$message.error('退出失败')
        }
      }, err => {
        throw new Error(err)
      })
    }
  }
};
</script>

<style>
.title {
  text-align: left;
  color: #fff;
}
.logout-wrapper {
  text-align: right;
}
.logout {
  margin-top: 15px;
  padding: 4px 8px;
  border: none;
  outline: none;
  cursor: pointer;
}
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background: #ccc; */
}
.el-container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: left;
  height: 100%;
}

.el-main {
  text-align: center;
}
</style>
