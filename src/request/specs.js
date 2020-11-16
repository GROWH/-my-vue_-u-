import $axios from "../common/http";

// 请求规格列表
export async function getSpecsList(params){
    const res = await $axios.get('/api/specslist',params);
    if(res.code==200){
        return res.list
    }
    return false;

}