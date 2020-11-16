import  $axios from "../common/http";


// 获取商品列表
export async function getCategoryList() {
    const res = await $axios.get("/api/catelist?istree=1");
    // console.log(res);
    if (res.code == 200) {
        return res.list
    }
    return false
}

// 根据id获取商品信息
export async function getCategoryById(id){
    const res = await $axios.get('/api/cateinfo',{params:{id}})
    if(res.code==200){
        return res.list;
    }
    return false;
}