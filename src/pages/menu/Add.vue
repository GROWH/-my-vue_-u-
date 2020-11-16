<template>
  <el-card>
    <el-form label-width="120px" :model="formData" :rules="formRules" ref="addForm">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级" prop="pid" v-if="formData.type==2">
        <el-select v-model="formData.pid" value="" placeholder="请选择">
          <el-option  value="" label="顶级目录"></el-option>
          <el-option
            v-for="item in menuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="图标" v-if="formData.type==1" prop="icon">
        <el-input v-model="formData.icon" placeholder="请输入菜单图标"></el-input>
      </el-form-item>
      <el-form-item label="地址" v-if="formData.type==2" prop="url">
        <el-input v-model="formData.url" placeholder="请输入菜单地址"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即添加</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {getMenuList} from '../../request/menu'
export default {
  data() {
    return {
        menuList:[],
      // 和表单元素进行双向数据绑定
      formData: {
        // 0代表顶级菜单
        pid: "",
        // 状态1正常 2禁用
        type: 1,
        // 标题
        title: "",
        // 图标
        icon: "",
        // 链接地址
        url: "",
        // 状态
        status: 1
      },
      // 进行表单校验
      formRules: {
        type: { required: true, message: "请选择类型", trigger: "blur" },
        title: { required: true, message: "请输入菜单名称", trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
            // console.log(this);
          // console.log('表单校验成功');
          const res = await this.$axios.post("/api/menuadd", this.formData);
          if (res.code == 200) {
                //  重置表单
             this.$refs.addForm.resetFields();
            return this.$success("操作成功");
         
          }
        } else {
          console.log("表单校验失败");
        }
      });
    },
    // 表单重置
    resetForm() {
      this.$refs.addForm.resetFields();
    }
  },
  created(){
      getMenuList().then(res=>{
          this.menuList=res
      })
  }
};
</script>

<style scoped>
.el-form {
  width: 600px;
  margin: 0 auto;
}
</style>