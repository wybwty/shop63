<template>
    <div class="home">

        <el-container class="home-container">
            <!-- 头部 -->
            <el-header class="header">
              <!-- 栅格布局el-ui 一列分数24等份-->
                <el-row>
                    <el-col :span="22"><div class="grid-content bg-purple-light"><h1 style="color:#ffff">后台管理系统</h1></div></el-col>
                    <el-col :span="2"><div class="grid-content bg-purple">
                        <a class="loginOut" @click.prevent="handleLoginOut()" >退出</a>
                        </div></el-col>
                    </el-row>
                </el-header>
            <el-container>
                <!-- 侧边栏 -->
                <el-aside width="200px" class="aside">

                     <el-menu default-active="1" :router="true" :unique-opened="true">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="users" >
                                    <i class="el-icon-menu"></i>
                                    用户列表
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <!-- 权限 -->
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>权限管理</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">
                                    <el-menu-item index="2-1" >
                                        <i class="el-icon-menu"></i>
                                        角色列表
                                    </el-menu-item>
                                    <el-menu-item index="rights" >
                                        <i class="el-icon-menu"></i>
                                        权限列表
                                    </el-menu-item>
                                </template>
                            </el-menu-item-group>
                        </el-submenu>

                        <!-- 商品 -->
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>商品列表</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="3-1" >
                                    <i class="el-icon-menu"></i>
                                    分类参数
                                </el-menu-item>
                                <el-menu-item index="3-2" >
                                    <i class="el-icon-menu"></i>
                                    商品分类
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <!--订单 -->
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>订单管理</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">
                                    <el-menu-item index="4-1" >
                                        <i class="el-icon-menu"></i>
                                       订单列表
                                    </el-menu-item>
                                </template>
                            </el-menu-item-group>
                        </el-submenu>

                        <!-- 数据统计 -->
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>数据统计</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">
                                    <el-menu-item index="5-1" >
                                        <i class="el-icon-menu"></i>
                                       数据报表
                                    </el-menu-item>
                                </template>
                            </el-menu-item-group>
                        </el-submenu>

                    </el-menu>
                </el-aside>
                <el-main class="main">
                    <router-view></router-view>
                    <!-- <router-view></router-view> -->
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
export default {
  beforeMount () {
    // 用户只要登陆后才能看到home页,此时需要在页面渲染前验证是否有token
    if (!localStorage.getItem('token')) {
      // 没有token,跳转至登录页
      this.$router.push({
        name: 'login'
      })
    };
  },
  methods: {
    handleLoginOut () {
      //   登出功能: 删除token 路由跳转至login页面,提示用户退出成功
      localStorage.clear()
      this.$router.push({name: 'login'})
      this.$message.success('退出成功!')
    }

  }
}

</script>

<style>
h1{
    font-weight: 700;
    font-size: 25px;
}
.home,.home-container{
    height: 100%;
    background-color:#ccc;
}
.home .header{
    background-color: #AEC0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 60px;
}

.home .aside {
    background-color: rgb(15, 110, 219);
    color: #333;
    /* text-align: center; */
    height: 100%;
    overflow: hidden;
}
.home .loginOut{
    color:blue;
    font-size: 16px;
}

.home .main {
    background-color: rgba(187, 187, 187, 0.733);
    color: #333;
    text-align: center;
     height: 100%;
}
.el-menu{
    width: 200px;
    height: 100%;
}

</style>
