<template>
  <fullscreen ref="fullscreen">
    <div class="layout">
    <el-container>
      <el-aside width="226px">
            <h3 class="login-text">小u商城后台</h3>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#262a32"
          text-color="#f1f1f1"
          active-text-color="#fff"
          router

          
          >
        
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/admin">管理员管理</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/category">商品分类</el-menu-item>
            <el-menu-item index="/specs">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/user">会员管理</el-menu-item>
            <el-menu-item index="/picture">轮播图管理</el-menu-item>
            <el-menu-item index="/miaosha">秒杀活动</el-menu-item>
          </el-submenu>

          <!--  -->
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>图像报表</span>
            </template>
            <el-menu-item index="/bar">柱状图</el-menu-item>
            <el-menu-item index="/pie">饼状图</el-menu-item>
            <el-menu-item index="/line">折线图</el-menu-item>
            <el-menu-item index="/goods/richtext">富文本</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-left">
            <el-button type="primary" icon="el-icon-s-fold" size="mini"></el-button>

            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
           <!-- 返回按钮 -->
            <el-button @click="$router.go(-1)" size="mini" icon="el-icon-back" circle plain></el-button>
          </div>

          <el-dropdown  @command="handleCommand">
            <span class="el-dropdown-link">
              admin
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="fullScreen" >
                <i class="el-icon-full-screen"></i>
                全屏操作
              </el-dropdown-item>
           
              <el-dropdown-item command="userinfo">
                <i class="el-icon-user"></i>
                个人信息
              </el-dropdown-item>

              <el-dropdown-item command="logout">
                <i class="el-icon-switch-button"></i>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>



        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
  </fullscreen>
</template>

<script>
import Vue from "vue";
// 导入vue-fullscreen全屏预览组件
import fullscreen from "vue-fullscreen";
// 注册插件
Vue.use(fullscreen)
export default {
  data(){
    return{
     
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
       // 下拉款的点击事件处理函数
    handleCommand(command){
        this[command]()
    },
    // 全屏操作
    fullScreen(){
        this.$refs.fullscreen.toggle();
    },
    // 个人信息
    userinfo(){},
    // 退出
    logout(){
       // console.log('logout');
       // 1-删除本地存储中的用户登录信息
        sessionStorage.removeItem('userinfo');
           // 2-重定向到/login
        this.$router.push('/login')
    }
  }
};
</script>
<style scoped>
.el-container {
  /* margin-bottom: 40px; */
  height: 100vh;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;

  background: #fff;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;


}

.login-text{
    text-align: center;
    line-height: 60px;
    background:#444;
    color: #fff;
    font-weight: normal;
    letter-spacing: 4px;
    overflow: hidden;
    overflow-wrap: nowrap;
}



.el-menu-vertical-demo{
    height: calc(100vh - 60px);
    border-right: 0;
}
.el-menu-vertical-demo li{
    text-align: left;
    /* background:rgb(102, 177, 255) ; */
}

/* 交集选择器 */
/* 设置导航高亮样式 */
.el-menu-item.is-active{
    background:#409eff!important;
}


.header-left {
  display: flex;
  align-items: center;
}
.header-left .el-breadcrumb{
    margin:0 10px;
}



.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
