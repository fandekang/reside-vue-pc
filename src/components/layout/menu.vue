<template>
  <menu-wrapper
  ref="menu"
  :data-url="url" 
  :titleHeight="'150px'" 
  :titleBgColor="'#303848'" 
  :titleTextColor="'#fff'"
  :default-active="'/task-processing?actType=2'"
  :defaultOpeneds="[0]"
  @tap="tap"
  class="menu" 
  background-color="#3F3C4C"
  text-color="#fff"
  active-text-color="#ffd04b" 
  :router="true">
  </menu-wrapper>
</template>
<script>
/* eslint-disable object-property-newline */
export default {
  data() {
    return {
      url: process.env.ROOT_API + 'menu/getmenu.do?type=1'
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
    tap(text) {
      this.$store.commit('changeMenuItemName', {menuItemName: text})  
    }
  },
  mounted() {
  }
};
</script>

<style>
  /* .el-menu {
    background: #8351d0 !important;
  }
  .el-menu .el-menu-item {
    background: #8351d0 !important;
  } */
  .menu {
    width: 100%;
    height: 100%;
  }
  /*.el-menu-item:hover,*/
  /*.el-submenu__title:hover {*/
    /*background-color: rgb(255, 255, 255)!important;*/
    /*color: #409EFF;*/
  /*}*/
</style>
