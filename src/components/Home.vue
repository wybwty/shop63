<template>
    <div class="home">
        <el-container>
            <el-header class="header">Header</el-header>
            <el-container>
                <el-aside width="200px" class="aside">Aside</el-aside>
                <el-main class="main">Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.home{
    height: 100%;
    background-color:pink;
}
.header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 60px;
}

.aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
}

.main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height:100%;
}

</style>
