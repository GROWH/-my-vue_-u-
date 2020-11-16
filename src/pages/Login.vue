<template>
  <div class="login">
    <div class="login-container">
      <div class="login-box">
        <h3 class="title">小u商城后台管理系统</h3>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
     
          class="demo-ruleForm"
        >
          <el-form-item  prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名">
                 <template slot="prepend"><i class="el-icon-user"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password placeholder="请输入密码">
                 <template slot="prepend"> <i class="el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
         
          <el-form-item>
            <el-button class="button" type="primary" @click="submitForm('ruleForm')">立即登录</el-button>

          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{required:true,message:'请输入用户名', trigger: "blur" }],
        password: [{required:true,message:'请输入密码',trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        //   alert("submit!");
        //   console.log(this);
        this.$axios.post("/api/userlogin",this.ruleForm)
        .then(res=>{
            console.log(res);
            if(res.code==200){
                 this.$success("登录成功")
                // 将数据接口返回的登录信息保存起来
                sessionStorage.setItem('userinfo',JSON.stringify(res.list));

                this.$router.push('/')
               
            //    this.$message({
            //         type:"success",
            //         message:"登录成功"
            //     });
            }else{
                this.$error("登录失败")
                
                // this.$message({
                //     type:"error",
                //     message:"登录失败"
                // })
            }
            
        })
        
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.login-container {
  height: 100vh;
  min-width: 970px;
  background: url("../assets/img/loginbg.jpeg");
    background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 400px;
  height: 300px;
  border-radius: 5px;
  background: #fff;
  padding: 30px;
}
.title {
  text-align: center;
  margin-bottom: 30px;
 color: rgb(64, 158, 255);
}
.button{
    width: 100%;
 
}
</style>
