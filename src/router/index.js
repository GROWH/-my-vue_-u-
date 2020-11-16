import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/pages/Login';
import Layout from '@/pages/Layout';
// 首页
import Home from '@/pages/Home';


// 菜单
import Menu from '@/pages/menu/Index';
import MenuAdd from '@/pages/menu/Add';
import MenuEdit from '@/pages/menu/Edit';
// 角色
import Role from '@/pages/role/Index';
import RoleAdd from '@/pages/role/Add';
import RoleEdit from '@/pages/role/Edit';
// 管理员
import Admin from '@/pages/admin/Index';
import AdminAdd from '@/pages/admin/Add';
import AdminEdit from '@/pages/admin/Edit';
// 商品分类
import Category from '@/pages/category/Index';
import CategoryAdd from '@/pages/category/Add';
import CategoryEdit from '@/pages/category/Edit';



// 商品规格
import Specs from '@/pages/specs/Index';
import SpecsAdd from '@/pages/specs/Add';
import SpecsEdit from '@/pages/specs/Edit';



// 商品管理
import Goods from '@/pages/goods/Index';
import GoodsAdd from '@/pages/goods/Add';
import GoodsEdit from '@/pages/goods/Edit';

// 会员管理
import User from '@/pages/user/Index';


// 轮播图管理
import Picture from '@/pages/picture/Index';
import PictureAdd from '@/pages/picture/Add';
import PictureEdit from '@/pages/picture/Edit';

// 秒杀活动
import Miaosha from '@/pages/miaosha/Index';
import MiaoshaAdd from '@/pages/miaosha/Add';
import MiaoshaEdit from '@/pages/miaosha/Edit';




// 富文本
import RichText from '@/pages/goods/RichText';
import Bar from '@/pages/charts/Bar';
import Pie from '@/pages/charts/Pie';
import Line from '@/pages/charts/Line';






Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      component: Layout,
      redirect:'/home',
      children: [
        // 首页
        {
          path: '/home',
          component: Home,
          meta:{
            title:'销售统计'
          },
        },
        // 菜单
        {
          path: '/menu',
          component: Menu,
          meta:{
            title:'菜单首页'
          },
        },
        {
          path: '/menu/add',
          component: MenuAdd,
          meta:{
            title:'菜单添加'
          },
        },
        {
          path: '/menu/:id',
          component: MenuEdit,
          meta:{
            title:'菜单编辑'
          },
        },
        // 角色
        {
          path: '/role',
          component: Role,
          meta:{
            title:'角色首页'
          },

        },
        {
          path: '/role/add',
          component: RoleAdd,
          meta:{
            title:'角色添加'
          },
        },
        {
          path: '/role/:id',
          component: RoleEdit,
          meta:{
            title:'角色编辑'
          },
        },
        // 管理员
        {
          path: '/admin',
          component: Admin,
          meta:{
            title:'管理员首页'
          },
        },
        {
          path: '/admin/add',
          component: AdminAdd,
          meta:{
            title:'管理员添加'
          },
        },
        {
          path: '/admin/:id',
          component: AdminEdit,
          meta:{
            title:'管理员编辑'
          },
        },
        // 商品分类
        {
          path: '/category',
          component: Category,
          meta:{
            title:'商品分类首页'
          },
        },
        {
          path: '/category/add',
          component: CategoryAdd,
          meta:{
            title:'商品分类添加'
          },
        },
        {
          path: '/category/:id',
          component: CategoryEdit,
          meta:{
            title:'商品分类编辑'
          },
        },


        // 商品规格
        {
          path: '/specs',
          component: Specs,
          meta:{
            title:'商品规格首页'
          },
        },
        {
          path: '/specs/add',
          component: SpecsAdd,
          meta:{
            title:'商品规格添加'
          },
        },
        {
          path: '/specs/:id',
          component: SpecsEdit,
          meta:{
            title:'商品规格编辑'
          },
        },

           // 富文本页面测试
           {
            path: '/goods/richtext',
            component: RichText
          },
  
        // 商品管理

        {
          path: '/goods',
          component: Goods,
          meta:{
            title:'商品管理首页'
          },
        },
        {
          path: '/goods/add',
          component: GoodsAdd,
          meta:{
            title:'商品管理添加'
          },
        },
        {
          path: '/goods/:id',
          component: GoodsEdit,
          meta:{
            title:'商品管理编辑'
          },
        },


        
        // 会员管理

        {
          path: '/user',
          component: User,
          meta:{
            title:'会员管理首页'
          },
        },

          // 轮播图管理

          {
            path: '/picture',
            component: Picture,
            meta:{
              title:'轮播图管理首页'
            },
          },
          {
            path: '/picture/add',
            component:PictureAdd,
            meta:{
              title:'轮播图管理添加'
            },
          },
          {
            path: '/picture/:id',
            component: PictureEdit,
            meta:{
              title:'轮播图管理编辑'
            },
          },

            // 秒杀活动

        {
          path: '/miaosha',
          component: Miaosha,
          meta:{
            title:'秒杀活动首页'
          },
        },
        {
          path: '/miaosha/add',
          component: MiaoshaAdd,
          meta:{
            title:'秒杀活动添加'
          },
        },
        {
          path: '/miaosha/:id',
          component: MiaoshaEdit,
          meta:{
            title:'秒杀活动编辑'
          },
        },





     

        // 柱状图
        {
          path: '/bar',
          component: Bar,
          meta:{
            title:'柱状图演示'
          },
        },
        // 饼状图
        {
          path: '/pie',
          component: Pie,
          meta:{
            title:'饼状图演示'
          },
        },
        // 折线图
        {
          path: '/line',
          component: Line,
          meta:{
            title:'折线图演示'
          },
        },

      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})


router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    const userInfo = JSON.parse(sessionStorage.getItem('userinfo')) || '{}';
    if (!userInfo.token) {
      return next('/login')
    }
    return next()
  }

  next();
})


export default router;
