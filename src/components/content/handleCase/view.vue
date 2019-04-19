<template>
  <div>
    <div class="menu-wrapper">
      <router-link :to="viewApply" active-class="activeClass">申请办理查看</router-link>/
      <router-link :to="viewMaterial" active-class="activeClass">收件材料查看</router-link>/
      <router-link :to="viewPrint" active-class="activeClass">办理缮证</router-link>/
      <a @click="back">返回</a>
    </div>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      viewApply:
        "/viewApply?actID=" +
        this.$route.query.actID +
        "&serialNO=" +
        this.$route.query.serialNO,
      viewMaterial:
        "/viewMaterial?actID=" +
        this.$route.query.actID +
        "&serialNO=" +
        this.$route.query.serialNO,
      viewPrint:
        "/viewPrint?actID=" +
        this.$route.query.actID +
        "&serialNO=" +
        this.$route.query.serialNO
    };
  },
  methods: {
    back() {
      this.$router.push("/task-processing?actType=2");
    }
  },
  mounted() {
    // console.log(this.$route);
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
.activeClass {
  color: red;
}
</style>
