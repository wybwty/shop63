<template>
  <div class="login">
    <el-form label-position="top" label-width="80px" :model="formLabelAlign" class="loginForm">
       <h2>用户登录页</h2>
      <el-form-item label="用户名" class="item_label">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" class="item_label">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-button type="primary" @click.prevent="handleLogin()" class="loginBtn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求

    async handleLogin () {
      // 目前代码: 异步的结果res在一个函数里面获取的
      // 目的: res的获取是同步
      // const res = axios请求返回的结果
      // console.log(res)

      const res = await this.$http.post(`login`, this.formLabelAlign)

      console.log(res)
      const {
        data: {
          data: { token },
          meta: { msg, status }
        }
      } = res

      if (status === 200) {
        // 提示: token值目前不需要关心 ,将来要用,把token永久存储
        // localStorage(Html5新特性)
        // (key名:要存储的数据)
        localStorage.setItem('token', token)
        // 渲染home.vue <- 改标识/  <- js代码编程导航$router
        this.$router.push({
          name: 'home'
        })
      } else {
        // 用户名/密码错误
        this.$message.error(msg)
      }

      /*
      .then(res => {
        console.log(res);
        const {
          data: {
            data,
            meta: { msg, status }
          }
        } = res;

        if (status === 200) {
          // 渲染home.vue <- 改标识/  <- js代码编程导航$router
          this.$router.push({
            name: "home"
          });
        } else {
          // 用户名/密码错误
          this.$message.error(msg);
        }
      });
      */
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2{
  text-align: center;
  font-size: 18px;
  font-weight: 700;
}
  .login{
    height: 100%;
    background-color:#324152;
    display: flex;
    justify-content:center;
    align-items:center;
  }
  .loginForm{

    width: 300px;
    height: 300px;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .loginBtn{
    margin-top: 20px;
    width: 100%;
  }
 /* .el-form-item_label{
   line-height: 20px !important;
 } */
</style>
