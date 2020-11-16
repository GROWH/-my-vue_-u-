<template>
  <div class='add'>
      <el-card>
        <el-form 
        label-width="120px"
        :model="formData"
        :rules="rules"
        >
          <el-form-item label="属性名" prop="specsname">
            <el-input placeholder="请输入属性名" v-model="formData.specsname"></el-input>
          </el-form-item>
          <el-form-item  label="属性值" prop="attrs">
           <div class="attr-item" v-for="(item,index) in attrList" :key="index">
              <el-input placeholder="请输入属性值" v-model="item.value"></el-input>
            <el-button type="success" v-if="index==0" @click="addAttr">添加</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">移除</el-button>
           </div>
          </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-radio-group v-model="formData.status">
                  <el-radio :label="1">正常</el-radio>
                  <el-radio :label="2">禁用</el-radio>
                </el-radio-group>
          </el-form-item>
              <el-form-item >
           
           
            <el-button @click="submitForm" type="success">立即添加</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>


        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

  data(){
    return {
      // 定义数据模型
      formData:{
        specsname:"",  //属性名称
        attrs:"",   // 属性值
        status:1   // 状态
      },

    attrList:[{value:''}],
      rules:{
        specsname:{required:true,message:"请输入属性名",trigger:"blur"},
        attrs:{required:true,message:"请输入属性值",trigger:"blur"},
        status:{required:true,message:"请选择状态",trigger:"blur"},
      }
    }
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
    // 属性值的添加按钮
    addAttr(){
      if(this.attrList.length>=5){
        return;
      }
      this.attrList.push({value:''})
    },
    // 移除按钮
    delAttr(index){
        this.attrList.splice(index,1)
    },
    submitForm(){

    },
    resetForm(){

    },

  }
}
</script>
<style scoped>


.el-form{
  width: 600px;
  margin: auto;
}
.attr-item{
  display: flex;
  width: 400px;
  margin: 5px 0;
  justify-content: space-between;
}
.attr-item .el-input{
    width:320px;
}
</style>
