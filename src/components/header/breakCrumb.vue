<template>
    <div class="breakContainer">
        <Breadcrumb>
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem to="/home/demo2">详情页</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style lang="scss" scoped>
    .breakContainer {
        height: 40px;
        line-height: 40px;
        background: #fff;
        text-indent: 20px;
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        z-index: 9;
    }
</style>


