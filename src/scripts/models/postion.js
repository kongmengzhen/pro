// 需要获取接口的数据  
module.exports={
    get({pageNo=1,pageSize=15}){
        return $.ajax({
            url:`/api/listmore.json?pageNo=${pageNo}&pageSize=${pageSize}`
        })
    }
}
// http://localhost:8000/api/listmore.json?pageNo=3&pageSize=15
// http://localhost:8000/listmore.json?pageNo=2&pageSize=15 //you
// https://m.lagou.com/listmore.json?pageNo=2&pageSize=15