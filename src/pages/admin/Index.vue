<template>
  <div class="index">
    <el-card>
      <el-button
        @click="$router.push('/admin/add')"
        type="primary"
        icon="el-icon-circle-plus-outline"
      >添加</el-button>
      <el-divider></el-divider>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              @click="edit(scope.row.uid)"
              type="success"
              size="mini"
              circle
              icon="el-icon-edit"
            ></el-button>
            <el-button
              @click="del(scope.row.uid)"
              type="danger"
              size="mini"
              circle
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="pageChange"
        :page-size="size"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getAdminList, getAdminCount } from "../../request/admin";
export default {
  data() {
    return {
      list: [],
      page: 1,
      size: 2,
      total: 1000
    };
  },
  created() {
    this.queryList();
    this.getCount();
  },
  methods: {
      edit(uid){
          this.$router.push('/admin/'+uid)
      },
      del(uid){
          this.$myConfirm(async ()=>{
              const res = await this.$axios.post('/api/userdelete',{uid})
                if(res.code==200){
                    const index = this.list.findIndex(item=>item.uid==uid)
                   this.list.splice(index,1)
                   return this.$success("删除成功")
                }
                return this.$error("删除失败")
          
          })

      },
    // 获取管理员列表
    async queryList() {
      const list = await getAdminList({ page: this.page, size: this.size });
    //   console.log(list);

      if (list) {
        this.list = list;
      }
    },
    // 获取数据总条数
    async getCount() {
      const total = await getAdminCount();
    //   console.log(total);
      this.total = total[0].total;
    },
    // 页码更新回调函数 
    pageChange(page){
        // console.log(page);
       // 1-更新页码,,页码发生改变时跳转到指定页
        this.page = page
         // 2-重新请求列表数据
        this.queryList()
        

    }
  }
};
</script>
<style scoped>
.el-pagination{
    margin-top: 20px;
}
</style>
