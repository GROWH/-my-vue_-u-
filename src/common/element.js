import {Message,MessageBox} from 'element-ui';
import Vue from 'vue'

// 成功提示
Vue.prototype.$success=function(message){
    Message({
        type:"success",
        message
    });
}

// 失败提示信息
Vue.prototype.$error=function(message){
    Message({
        type:"error",
        message
    });
}

//  封装一个确认框函数
Vue.prototype.$myConfirm = function (callback) {
  MessageBox.confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        callback&&callback();
      }).catch(() => {
        Message({
          type: 'info',
          message: '已取消删除'
        });          
      })
}