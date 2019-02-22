<template>
    <div class="rights">
       <el-card>
            
            <breadCrumb level1="权限管理" level2="权限列表"></breadCrumb>
            <!-- 列表 -->
            <div class="rightsTable" >
                <template>
                <el-table
                height="450px"
                :data="list"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="#"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="authName"
                    label="权限名"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="path"
                    label="路径"
                    width="220">
                </el-table-column>
                <el-table-column
                    
                    label="层级"
                    width="260">

                        <template slot-scope = "scope">
                            <span v-if="scope.row.level === '0'">一层级</span>
                            <span v-if="scope.row.level === '1'">二层级</span>
                            <span v-if="scope.row.level === '2'">三层级</span>
                        </template>
                </el-table-column>
               
                
                </el-table>
            </template>
           </div>

       </el-card>
    </div>
</template>

<script>
export default {
    name:'rights',
    data() {
        return{
            list:[]
        }
    },
    created(){
        this.getAllRights()
    },
    methods:{
      async getAllRights(){
        const res = await this.$http.get(`rights/list`);
        console.log(res);
        const{ data, meta:{msg, status}} = res.data;
        this.list = data;
        }
    }
}
</script>

<style>
    .rightsTable{
        margin-top: 20px;
    }
</style>
