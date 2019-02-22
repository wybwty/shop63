<template>
    <div class="users">
       <!-- 卡片模板 -->
        <el-card class="box-card">

            <!-- 面包屑路标 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>

            <!-- 搜索添加用户组 -->
           <el-row class="search-rows">
                <el-col>

                    <!-- 搜索框 -->
                    <el-input
                    placeholder="请输入内容"
                    v-model="query"
                    clearable
                    class="searchInput"
                    @clear="getAllUsers()"
                    >
                    <el-button slot="append" icon="el-icon-search" @click="userSearchBtn()"></el-button>
                    </el-input>
                    <el-button type="primary" plain @click="userAddDialog()">添加用户</el-button>
                </el-col>

           </el-row>
           <!-- 添加用户的弹框默认不显示 -->
           <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
               <el-form label-position="left" label-width="60px" :model="usersFormData" class="userAddForm">
                    <el-form-item label="用户名" class="item_label">
                        <el-input v-model="usersFormData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" class="item_label">
                        <el-input v-model="usersFormData.password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" class="item_label">
                        <el-input v-model="usersFormData.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" class="item_label">
                        <el-input v-model="usersFormData.mobile"></el-input>
                    </el-form-item>
                </el-form>

                <!-- 确认取消按钮部分 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="usersAdd()">确 定</el-button>
            </div>
        </el-dialog>

            <!-- 用户列表组 -->
           <div class="usersTable">
                <template>
                <el-table
                :data="list"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="#"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="电话"
                    width="160">
                </el-table-column>
                <el-table-column
                    label="创建日期"
                    width="160">

                   <template slot-scope="scope">
                    <!-- 内层 list.row 表示的是list的每个对象-->
                    {{scope.row.create_time|fmtdate}}
                    </template>

                </el-table-column>
                <el-table-column
                    label="用户状态"
                    width="120">
                    <template slot-scope = "scope">
                        <el-switch
                        @change="handleUserStatus(scope.row)"
                        v-model="scope.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                        </el-switch>
                    </template>

                </el-table-column>
                <el-table-column
                    label="编辑"
                   >
                   <template slot-scope="scope">
                        <el-button type="primary" size="mini"  @click="handleUsersEdit(scope.row)"  icon="el-icon-edit" circle  plain ></el-button>
                        <el-button type="danger" size="mini" @click="handleUsersDelete(scope.row)" icon="el-icon-delete" circle  plain></el-button>
                        <el-button type="success" size="mini" @click="handleUsersRole(scope.row)"  icon="el-icon-check" circle plain></el-button>
                   </template>
                </el-table-column>
                </el-table>
            </template>
           </div>
             <!-- 会话框-编辑用户会话框 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
               <el-form label-position="left" label-width="60px" :model="usersEditFormData" class="userEditForm">
                    <el-form-item label="用户名" class="item_label">
                        <el-input v-model="usersEditFormData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" class="item_label">
                        <el-input v-model="usersEditFormData.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" class="item_label">
                        <el-input v-model="usersEditFormData.mobile"></el-input>
                    </el-form-item>
                </el-form>

                <!-- 确认取消按钮部分 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="usersEdit()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 分配角色对话框 -->
        <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
            <el-form :model="usersFormData">
                <el-form-item label="用户名" label-width="60px">
                    
                    <!-- <el-input autocomplete="off" style="width:260px">
                        {{usersFormData.username}}
                    </el-input> -->
                    <el-form-item> {{usersFormData.username}}</el-form-item>
                </el-form-item>
                <el-form-item label="角色" label-width="60px">  
                <el-select v-model="selectVal" placeholder="请选择角色名">
                    <el-option label="请选择" value="-1"></el-option>

                    <el-option 
                    :label="item.roleName"
                    :value="item.id"
                    v-for="(item,i) in role" 
                    :key="item.id"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
                <el-button type="primary" @click="handlePutRole()">确 定</el-button>
            </div>
        </el-dialog>


            <!-- 分页组 -->
            <div class="fy-block">
                <!-- page-size	每页显示条目个数
                total	总条目数 current-page	当前页数
                current-change	currentPage 当前页数改变时会触发
                size-change    pageSize 改变时会触发
                :current-page 当前页数
                -->
                 <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="4"
                :page-sizes="[2, 4, 6, 8]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total=total>
                </el-pagination>
            </div>

        </el-card>

    </div>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      // 发送请求时所携带的参数
      query: '', // 搜索框数据绑定
      pagesize: '2',
      pagenum: '1',
      total:1,

      // 表格绑定数据
      tableData: '',
      list: [],
      // 表单绑定数据
      usersFormData: {
        // username	用户名称	不能为空
        // password	用户密码	不能为空
        // email	邮箱	可以为空
        // mobile	手机号	可以为空
        password: '',
        username: '',
        email: '',
        mobile: '',
      },
      // 表单绑定数据
      usersEditFormData: {
        // username	用户名称	不能为空
        // password	用户密码	不能为空
        // email	邮箱	可以为空
        // mobile	手机号	可以为空
        password: '',
        username: '',
        email: '',
        mobile: ''
      },
    //   分配角色下拉菜单数据
      
        // 储存下拉菜单的角色名(数组形式)
        role:[],
        role_name:'',
        selectVal:'-1',
         role_id:'',
      // 添加的弹框的绑定值开或关
      dialogFormVisibleAdd: false,
      // 编辑用户弹框的绑定值开或关
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole:false
    }
  },
  created () {
    this.getTableData()
  },
  methods: {

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    // 点击val条数发生改变,并根据所点击的每页条数发送请求加载数据默认从第一页开始加载
    this.pagenum=1,
    this.pagesize= val,
    this.getAllUsers()
    },

    // 点击页码请求第几页的数据
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val,
      this.getAllUsers()
    },

     //文本清空时操作样式,重新加载数据
    getAllUsers () {
      this.getTableData()
    },

    //   搜索按钮发送请求默认从第一页开始搜索
    userSearchBtn () { 
      this.pagenum = '1'
      this.getTableData()
    },

    // 定义一个发送数据请求的函数
    // 请求路径：users
    // 请求方法：get
    // 请求参数
    // 参数名	参数说明	备注
    // query	查询参数	可以为空
    // pagenum	当前页码	不能为空
    // pagesize	每页显示条数


    //获取users页面内表格所有数据
    async getTableData () {
      
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      console.log(res);
      // 获取响应结果,状态码,提示信息
      const {data, meta: {msg, status}} = res.data

      if (status === 200) {
        // 请求数据成功时把data.users响应数据赋值给list文件
        this.list = data.users
        this.total = data.total;
      }
    },
    // 修改用户状态开关
    async handleUserStatus (user) {
      
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      console.log(res)
      const{meta:{msg, status}} = res.data
      if(status === 200){
          this.$message.success(msg);
      }
    },
    // 添加用户 
    userAddDialog () {
      this.dialogFormVisibleAdd = true
    //   根据接口文档发送添加请求
        // 1.3.2. 添加用户
        // 请求路径：users
        // 请求方法：post
        // 请求参数
        // 参数名	参数说明	备注
        // username	用户名称	不能为空
        // password	用户密码	不能为空
        // email	邮箱	可以为空
        // mobile	手机号	可以为空
        // 响应参数
    },

    //  添加用户弹框的的确定功能
    async usersAdd () {
      const res = await this.$http.post('users', this.usersFormData)
      console.log(res)
      this.dialogFormVisibleAdd = false
      const {meta: {msg, status}} = res.data
      this.$message.success(msg)
      // 更新表格数据
      this.getAllUsers()
    },

    // 删除用户功能
    handleUsersDelete (user) {
      this.$confirm('是否要删除该用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发送异步请求
          // 请求路径：users/:id
          // 请求方法：delete
          // 请求参数
          const res = await this.$http.delete(`users/${user.id}`)
          console.log(res)
          const {data, meta: {msg, status}} = res.data
          this.$message.success(msg)
          // 删除后重新加载列表数据
          this.getAllUsers()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },

    // 编辑用户功能
    async handleUsersEdit (user) {
      this.dialogFormVisibleEdit = true
      //  发送请求
      const res = await this.$http.get(`users/${user.id}`)
    //   console.log(res)
      this.usersEditFormData = res.data.data
    },

    //  编辑弹出框的确认按钮
    async usersEdit () {
      console.log('编辑框确认')
      const res = await this.$http.put(`users/${this.usersEditFormData.id}`, this.usersEditFormData)
    //   console.log(res)
      this.dialogFormVisibleEdit = false
      this.getAllUsers()
    },

    // 分配角色功能:
    async handleUsersRole(user){
        // 打开弹框
         this.dialogFormVisibleRole = true;
        // console.log(user);
        this.usersFormData.username = user.username;
        this.role_id= user.id ;

        //  发送请求分配角色弹框的数据
        const res =  await this.$http.get('roles');
       // console.log(res);
     
        // 把获取的数据赋值给定义的role数组
        const{data,meta:{status, msg}} =res.data;
        if(status === 200){
            this.role = data;
        }
        // console.log(this.role);

        const res2 =  await this.$http.get(`users/${user.id}`);
        // console.log(res2);
        // 角色id赋给页面的绑定数值显示
        this.selectVal = res2.data.data.rid;
       
    },
    async handlePutRole(){
        const res = await this.$http.put(`users/${this.role_id}/role`,{rid:this.selectVal});
        
        console.log(res);
        // 关闭对话框
        this.dialogFormVisibleRole = false;
    }
    
  }
}
</script>

<style>
.home .users{
    text-align: left;
}
.search-rows {
  margin-top: 20px;
  text-align: left;
}
.searchInput {
  width: 300px;
}
.usersTable {
  margin-top: 20px;
}
.fy-block {
  margin-top: 20px;
}

</style>
