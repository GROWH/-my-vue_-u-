<template>
  <div class='richtext'>
     <el-card>
          <h1>hello 富文本</h1>
      <el-divider></el-divider>
      <vue-wangeditor v-model="context" id="editor" width="100%" ref="editor"></vue-wangeditor>
    <el-button type="success" @click="getHtml">获取内容</el-button>
    <el-button type="primary"  @click="setHtml">设置内容</el-button>

     </el-card>
      
  </div>
</template>

<script>
import vueWangeditor from "vue-wangeditor";
export default {
  name: 'richtext',

  data(){
    return {
        content:` <h1>hello 富文本</h1>`
    }
  },
  components: {
      vueWangeditor
  },
  created(){},
  mounted(){},
  methods: {
      getHtml(){
          const res = this.$refs.editor.getHtml()
          console.log(res);
          
      },
       setHtml() {
        this.$refs.editor.setHtml(`
            <h1>你好, 世界</h1>
        `);
    }
      
  }
}
</script>
<style scoped>
</style>
