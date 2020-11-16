import $axios from "../common/http";

// 获取管理员列表
// {page:1,size:2}
export async function getAdminList(data){
    const res = await $axios.get('/api/userlist',{params:data});
    if(res.code==200){
        return res.list
    }
    return false

}

// 获取管理员的总条数
export async function getAdminCount(){
    const res = await $axios.get('/api/usercount');
    if(res.code==200){
        return res.list
    }
    return false
     
}
// 根据uid获取管理员信息
export async function getInfoById(uid){
    const res = await $axios.get('/api/userinfo',{params:{uid}})
    // const res = await $axios.get('/api/userinfo?uid=${uid}')
    if(res.code==200){
        return res.list
    }
    return false

}
