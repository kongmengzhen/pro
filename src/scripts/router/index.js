import indexController from '../controllers/index'
import positionController from '../controllers/position'
import searchController from '../controllers/search'
import profileController from '../controllers/profile'
// 因为这个页面是路由页面  我们需要监控hash  的值

class Router{
    constructor () {      
        this.render()        
    }
    setActiveClass(hash) {
        $(`footer li[data-to=${hash}]`).addClass('active').siblings().removeClass('active')
      }

    renderDom(hash){        
        let pageControllers = {
            positionController,
            searchController,
            profileController
          }      
          pageControllers[hash+ 'Controller'].render()      
    }

    render(){
        window.addEventListener('hashchange',this.handleHashchange.bind(this))
        // 首次加载时候没有内容  我们要绑定事件 
        window.addEventListener('load',this.handlePageload.bind(this))
        // positionController. render()
    }
    handleHashchange(){
        let hash =location.hash.substr(1)
        this.setActiveClass(hash)
        this.renderDom(hash)
   
    }
    handlePageload(){
        indexController.render()
         //    默认展示position  因此 我们要在路径后面拼接
         let hash=location.hash.substr(1)||'position'
         console.log(hash)
         location.hash = hash
         this.renderDom(hash)
         this.setActiveClass(hash)


    }

}
new Router()
/* let currentPage = $(this).attr("data-page")
    console.log(currentPage)
    // 接下来的目标是让对应li  的render 执行
    let pageControllers = {
      positionController,
      searchController,
      profileController
    }

    pageControllers[currentPage + 'Controller'].render()
 */