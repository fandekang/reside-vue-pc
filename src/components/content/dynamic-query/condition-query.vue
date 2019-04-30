<template>
    <div class="condition-query">
        <header class="header">
            <div class="close" @click="back">
                <i class="fa fa-times"></i>
            </div>
        </header>
        <div class="title"></div>
    </div>
</template>
<script>
export default {
    methods: {
        back() {
            this.$emit('back')
        }
    }
}
</script>

<style lang="scss" scoped>
.condition-query {
    box-sizing: border-box;
    padding: 0 20px;
    .header {
        display: flex;
        justify-content: flex-end;
        .close {
            width: 25px;
            height: 25px;
            text-align: center;
            line-height: 25px;
            font-size: 25px;
            cursor: pointer;
        }
    }
}
</style>
