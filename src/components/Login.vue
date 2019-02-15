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
      <el-button @click.prevent="handlelogin()" class="login-btn" type="primary">登录</el-button>
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
    async handlelogin () {
      const res = await this.$http.post(`login`, this.formLabelAlign)
      console.log(res)
      const {
        data: {
          meta: { status, msg }
        }
      } = res

      if (status === 200) {
        const token = res.data.data.token
        localStorage.setItem('token', token)
        this.$router.push({ name: 'home'})
      } else {
        this.$message.error(msg)
      }
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
  .login-btn{
    margin-top: 20px;
    width: 100%;
  }
 /* .el-form-item_label{
   line-height: 20px !important;
 } */
</style>
