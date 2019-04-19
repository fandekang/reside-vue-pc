<template>
  <div>
    <div class="menu-wrapper">
      <router-link :to="writeApply" active-class="activeClass">申请</router-link>/
      <router-link :to="writeMaterial" active-class="activeClass">收件材料</router-link>
      <button class="back" @click="back">返回</button>
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
      writeApply:
        "/writeApply?actID=" +
        this.$route.query.actID +
        "&serialNO=" +
        this.$route.query.serialNO,
      writeMaterial:
        "/writeMaterial?actID=" +
        this.$route.query.actID +
        "&serialNO=" +
        this.$route.query.serialNO
    };
  },
  methods: {
    back() {
      // alert('点击了返回')
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
  color: #333;
  text-decoration: none;
  cursor: pointer;
}
.activeClass {
  color: #333;
  font-size: 18px;
  font-weight: 700;
}
.back {
  /* margin-top: 5px; */
  /* padding: 8px 40px; */
  font-size: 16px;
  border: none;
  outline: none;
  border-radius: 6px;
  background: transparent;
  /* background-color: #8351d0; */
  /* color: #fff; */
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
</style>
