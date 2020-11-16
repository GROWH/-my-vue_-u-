<template>
  <div class="index">
    <el-card>
      <el-button
        @click="$router.push('/category/add')"
        type="primary"
        icon="el-icon-circle-plus-outline"
      >添加</el-button>
      <el-divider></el-divider>
      <el-table
        :data="list"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
        <el-table-column prop="img" label="分类图片"  width="180">

          <!-- 有问题  需要改 -->
          <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" v-if="scope.row.img!=''" :src="$imgBaseUrl+scope.row.img" ></el-image>
         </template>
        <!-- 图片改动结束处 -->



        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              @click="edit(scope.row.id)"
              type="success"
              size="mini"
              circle
              icon="el-icon-edit"
            ></el-button>
            <el-button
              @click="del(scope.row.id)"
              type="danger"
              size="mini"
              circle
              icon="el-icon-delete"
            ></el-button>
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
      list: [{}]
    };
  },
  methods: {
    edit(id) {
      // this.$router.push("/category/" + id);
      // 模板字符串
      this.$router.push(`/category/${id}`);
    },
    del(id) {
      this.$myConfirm(async ()=>{
        const res = await this.$axios.post('/api/catedelete',{id})
        if(res.code==200){
          // 1-成功提示
          this.$success("删除成功")
          // 2-更新视图层
          const index = this.list.findIndex(item=>item.id==id)
          this.list.splice(index,1)
        }
        else(
          this.$error("删除失败")
        )
      })
    },
    // 获取商品列表
    async getCategoryList() {
      const res = await this.$axios.get("/api/catelist?istree=1");
      // console.log(res);
      if (res.code == 200) {
        this.list = res.list;
      }
    }
  },
  created() {
    this.getCategoryList();
  }
};
</script>
<style scoped>
</style>
