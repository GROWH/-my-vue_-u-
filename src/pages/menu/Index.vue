<template>
  <div class="index">
    <el-card>
    <el-button @click="$router.push('/menu/add')" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
    <el-divider></el-divider>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}" 
    >
      <el-table-column prop="id" label="ID" ></el-table-column>
      <el-table-column prop="title" label="标题"  ></el-table-column>
      <el-table-column prop="icon" label="图标" width="180">
        <!-- 作用域插槽 -->
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>

      </el-table-column>
   
    <el-table-column prop="url" label="地址" width="180"></el-table-column>
      <el-table-column prop="type" label="状态" >
           <!-- 作用域插槽 -->
        <template slot-scope="scope">
         <el-tag type="success" v-if="scope.row.type==1">正常</el-tag>
         <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
         <!-- 作用域插槽 -->
        <template slot-scope="scope">
         <el-button @click="edit(scope.row.id)" circle icon="el-icon-edit" size="mini" type="success"></el-button>
         <el-button @click="del(scope.row.id)" circle icon="el-icon-delete" size="mini" type="danger"></el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    
    };
  },
  created(){
    this.getMenuList()
  },
 methods:{
   edit(id){
     this.$router.push('/menu/'+id)
   },
  del(id){
      this.$myConfirm (async ()=>{
         const res = await this.$axios.post('/api/menudelete',{id:id})
            // console.log(res);
        if(res.code==200){
          this.$success('删除成功')
            // 刷新列表数据:
              // 1-重新请求数据列表this.getMenuList()
              // 2-直接删除数组中对应的元素 splice(index,1);
              // 通过id查找索引号
              const index=this.list.findIndex(item=>item.id==id);
              // 删除数组元素, 界面层会自动刷新
              this.list.splice(index,1);
        }else{
           this.$error('删除失败') 
        }

      }) 
    
   },


      // 获取菜单列表
   getMenuList(){
     this.$axios.get('/api/menulist?istree=1')
     .then(res=>{
      //  console.log(res);
      if(res.code==200){
        this.list = res.list
      }
       
     })
   }
 }
};
</script>
<style scoped>
</style>
