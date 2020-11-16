<template>
  <div class="index">
    <el-card>
      <el-button @click="$router.push('/role/add')" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
      <el-divider></el-divider>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="ID" min-width="80"></el-table-column>
        <el-table-column prop="rolename" label="角色名称" min-width="180"></el-table-column>
        <el-table-column prop="status" label="状态" min-width="180">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template v-slot="scope">
            <el-button
              @click="edit(scope.row.id)"
              circle
              icon="el-icon-edit"
              size="mini"
              type="success"
            ></el-button>
            <el-button
              @click="del(scope.row.id)"
              circle
              icon="el-icon-delete"
              size="mini"
              type="danger"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRoleList } from "../../request/role";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {

     del(id){
      this.$myConfirm(async()=>{
        // console.log(id);
      const res = await this.$axios.post('/api/roledelete',{id});
      if(res.code==200){
        this.$success('删除成功')
        const index = this.list.findIndex(item=>item.id==id);
        this.list.splice(index,1)
      }
      })
      
      
    },
    edit(id){
      this.$router.push('/role/'+id)
    },
    async getList() {
      const res = await getRoleList();
    //   console.log(res);

      if (res) {
        this.list = res;
      }
    }
  }
};
</script>
<style scoped>
</style>
