import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import ElementUI from "element-ui";
import ElWrapper from "../Element-Framework";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import resource from 'vue-resource';
import 'jquery';

import 'font-awesome/css/font-awesome.css';

import moduleHead from '@/assets/js/store/moduleHead';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(ElWrapper);
Vue.use(resource);
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    moduleHead
  }
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

// 路由 过滤器
// router.beforeEach((to, from, next) => {
//   this.$http.get(process.env.ROOT_API + 'login/getLoginName')
//   .then(res => {
//     if (res.success) {
//       this.$store.commit('toggleLoginShow', {login: false})
//       this.$store.commit('toggleAppShow', {login: true})
//     } else {
//       this.$store.commit('toggleLoginShow', {login: true})
//       this.$store.commit('toggleAppShow', {login: false})
//     }
//   }, err => {
//     alert('请求验证登录接口失败')
//     throw new Error(err)
//   })
// })
