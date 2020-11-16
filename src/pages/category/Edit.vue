<template>
  <div class="add">
    <el-card>
      <el-form label-width="120px" :model="cateInfo" :rules="formRules" ref="addForm">
        <el-form-item label="上级分类" prop="pid">
          <el-select v-model="cateInfo.pid" value placeholder="请选择">
            <el-option value label="请选择"></el-option>
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in topCatList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="cateInfo.catename" placeholder="请输入菜单名称"></el-input>
        </el-form-item>

        <el-form-item label="分类图片" prop="img">
           <!-- action:指定上传图片的接口地址
           list-type：指定展示样式
           on-preview：预览的事件监听函数
           on-remove：删除的事件监听函数
           auto-upload：图片是否自动上传
           on-change：监听文件的改变
           limit：限制上传图片的数量
           on-exceed：当图片超出上传限制时所触发的函数
           file-list:需要被展示的图片里列表
           -->
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="fileChange"
            :limit="1"
            :on-exceed="limitTips"
            :file-list="imgList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="cateInfo.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即更新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCategoryList, getCategoryById } from "../../request/category";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 一级分类（顶级分类）
      topCatList: [],
      // 和表单元素进行双向数据绑定
      cateInfo: {
        // 0代表顶级菜单
        pid: "",
        catename: "",
        img: "",
        // 状态
        status: 1,
        id: this.$route.params.id
      },
      imgList: [],
      // 进行表单校验
      formRules: {
        pid: { required: true, message: "请选择类型", trigger: "blur" },
        catename: {
          required: true,
          message: "请输入分类名称",
          trigger: "blur"
        },
        status: { required: true, message: "请选择状态", trigger: "blur" }
      }
    };
  },
  components: {},
  created() {
    this.getCategoryList();
    this.getCategoryById();
  },
  mounted() {},
  methods: {
    // 根据id获取商品信息(获取当前被编辑的分类信息)
    async getCategoryById() {
      const res = await getCategoryById(this.cateInfo.id);
      // 更新数据
      if (res) {
        this.cateInfo = res;
        this.imgList = res.img==''?[]: [{ url: this.$imgBaseUrl + res.img }];
      }
    },

    // 获取上级分类-- 商品列表
    async getCategoryList() {
      const res = await getCategoryList();
      if (res) {
        // 更新数据
        this.topCatList = res;
      }
    },
    // 图片上传相关
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    submitForm() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // console.log(this);
          // console.log('表单校验成功');
          // 通过FormData对象处理数据进行提交
          const fd = new FormData();
          for (let key in this.cateInfo) {
            fd.append(key, this.cateInfo[key]);
          }
          fd.append("id", this.$route.params.id);
          const res = await this.$axios.post("/api/cateedit", fd);
          // console.log(this);

          if (res.code == 200) {
            //  重置表单
            this.$refs.addForm.resetFields();
            this.$success("更新成功");
          } else {
            this.$error("更新失败");
          }
        } else {
          console.log("表单校验失败");
        }
      });
    },
    // 监听文件的改变
    fileChange(file) {
      //  将图片的原始信息保存到this.cateInfo.img属性之中
      this.cateInfo.img = file.raw;
    },
    // 图片数量超出限制之后的回调
    limitTips() {
      this.$error("此处只能上传一张图片");
    }
  }
};
</script>
<style scoped>
.el-form {
  width: 600px;
  margin: 0 auto;
}
</style>
