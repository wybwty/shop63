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
                    v-model="usersSearch"
                    clearable
                    class="searchInput"
                    >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input> 
                    <el-button type="primary" plain>添加用户</el-button>
                </el-col>
               
           </el-row>

            <!-- 用户列表组 -->
           <div class="usersTable">
                <template>
                <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="#"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="电话"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="创建日期"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="用户状态"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="bj"
                    label="编辑"
                   >
                </el-table-column>
                </el-table>
            </template>
           </div>


            <!-- 分页组 -->
           
            <div class="fy-block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
                </el-pagination>
            </div>
         


        </el-card>

    </div>
</template>

<script>
export default {
    name:'users',
    data(){
        return{
            usersSearch:''
        }
    }
}
</script>

<style>
    .search-rows{
        margin-top: 20px;
        text-align: left;
    }
    .searchInput{
        width: 300px;
    }
    .usersTable{
        margin-top:20px
    }
    .fy-block{
        margin-top: 20px;
        text-align: left;
    }
</style>
