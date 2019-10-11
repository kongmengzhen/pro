// 这个页面的主要功能加载项目的壳
const layoutView = require('../views/lay.art')
// 在这个页面实现单页面的应用 首先 我们先不利用路由来实现这个单页面的应用。
class Index {
  constructor() {
   
  }
  bindClick() {
    // 这里面的this指的是当前被点击的那个元素 我们要在当前的路径上加上hash值
    location.hash=$(this).attr('data-to') 
  
  }
  render(){
    const html = layoutView()
    $('#root').html(html);   
    $('footer li').on('click', this.bindClick)
  }
}

export default new Index()