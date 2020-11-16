import $axios from "../common/http";

// 获取角色列表
export async function getRoleList(){
    const res = await $axios.get('/api/rolelist');
    if(res.code==200){
        return res.list
    }
    return false
    
}


// 根据id获取角色信息
export async function getRoleById(id){
    const res = await $axios.get('/api/roleinfo',{params:{id}});
    if(res.code==200){
        return res.list;
    }
    return false;

}