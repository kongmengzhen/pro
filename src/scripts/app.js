// const  layoutView=require('./views/layout.html')
//  document.querySelector("#root").innerHTML=layoutView
// 由于需要  我们需要 将数据改为动态的 使用art-template
/* const  layoutView=require('./views/lay.art')
const html=layoutView({
    name:"kmz111"
})
document.querySelector("#root").innerHTML=html
 */
// 这个页面的功能主要是作为入口文件  只引入index.js
// require('./controllers/')
// 这个页面 目前只引入路由
require('./router/index')




