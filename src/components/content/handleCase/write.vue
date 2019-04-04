<template>
    <div>
        <div class="menu-wrapper">
            <router-link to="/writeApply" active-class="activeClass">申请</router-link> /
            <router-link to="/writeMaterial" active-class="activeClass">收件材料</router-link> /
            <a @click="back">返回</a>
        </div>
        <div class="content-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        back() {
            // alert('点击了返回')
            this.$router.push('/task-processing')
        }
    }
}
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
