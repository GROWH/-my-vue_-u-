<template>
  <div class="add">
    <el-card>
      <el-form label-width="120px" :model="formData" :rules="formRules" ref="addForm">
        <el-form-item label="名称" prop="rolename">
          <el-input v-model="formData.rolename" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="defaultProps"
            ref="tree"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" type="primary">立即添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getMenuList } from "../../request/menu";
export default {
  data() {
    return {
      formData: {
        rolename: "",
        menus: "",
        status: 1
      },
      formRules: {
        rolename: {
          required: true,
          message: "请输入角色名称",
          trigger: "blur"
        },
        status: { required: true, message: "请选择状态", trigger: "blur" }
      },
      menuList: [],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //   console.log("表单正确");
          const menus = this.$refs.tree.getCheckedKeys();
          // console.log(menus);
          this.formData.menus = menus.join(",");
          // return
          this.$axios.post("/api/roleadd", this.formData).then(res => {
            // console.log(res);
            if (res.code == 200) {
              this.$success("添加成功");
              this.resetForm()
            } else {
              this.$error("添加失败");
            }
          });
        } else {
          console.log("表单校验不通过");
        }
      });
    },
    resetForm() {
      this.$refs.addForm.resetFields();
    },

    async getMenuList() {
      const res = await getMenuList();
      if (res) {
        // console.log(res);

        this.menuList = res;
      }
    }
  },
  created() {
    this.getMenuList();
  }
};
</script>
<style scoped>
.el-form {
  width: 600px;
  margin: auto;
}
</style>
