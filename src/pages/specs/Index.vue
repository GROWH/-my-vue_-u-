<template>
  <div class="index">
    <el-card>
      <el-button @click="$router.push('/specs/add')" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
      <el-divider></el-divider>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="ID" min-width="80"></el-table-column>
        <el-table-column prop="specsname" label="规格名称" min-width="180"></el-table-column>
        <el-table-column prop="attrs" label="可选值" min-width="180">
          <template v-slot="scope">
            <el-tag type="success" v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="180">
            <template v-slot="scope">
              <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
              <el-tag type="danger" v-else>禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template v-slot="scope">  
            <el-button @click="edit($router.push('/specs/'+scope.row.id),scope.row.id)"
            type="success" circle icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" circle icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getSpecsList } from "../../request/specs";
export default {
  data() {
    return {
      list: [],
      page: 1,
      size: 1
    };
  },

  components: {},
  created() {
    this.getSpecsList();
  },
  mounted() {},
  methods: {
    // 获取规格列表
    async getSpecsList() {
      const list = await getSpecsList({ page: this.page, size: this.size });
      if (list) {
        // console.log(list);
        this.list = list;
      }
    }
  }
};
</script>
<style scoped>
.el-tag {
  margin: 0 2px;
}
</style>
