<template>
  <div class="add">
    <el-card>
      <el-form label-width="120px" :model="formData" :rules="formRules" ref="addForm">
        <el-form-item label="角色名称" prop="roleid">
          <el-select v-model="formData.roleid">
            <el-option value="" label="请选择"></el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :value="item.id"
              :label="item.rolename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称" prop="username">
          <el-input v-model="formData.username" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input v-model="formData.password" show-password type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <template>
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </template>
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
import { getRoleList } from "../../request/role";
export default {
  data() {
    return {
      rolelist: [],
      formData: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      },
      formRules: {
        roleid: { required: true, message: "请选择", trigger: "blur" },
        username: { required: true, message: "请输入", trigger: "blur" },
        password: { required: true, message: "请输入", trigger: "blur" }
      }
    };
  },
  components: {},
  created() {
    this.getRoleList();
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          //   console.log("表单校验成功");
          const res = await this.$axios.post("/api/useradd", this.formData);
          if (res.code == 200) {
            this.$success("添加成功");
            //   this.$refs.addForm.resetFields()
            this.resetForm();
          } else {
            this.$error("添加失败");
          }
        } else {
          console.log("表单校验失败");
        }
      });
    },
    resetForm() {
      this.$refs.addForm.resetFields();
    },

    async getRoleList() {
      const res = await getRoleList();
    //   console.log(res);

      if (res) {
        this.rolelist = res;
      }
    }
  }
};
</script>

<style scoped>
.el-form {
  width: 600px;
  margin: auto;
}
</style>
