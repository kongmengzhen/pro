const positionView = require('../views/position.art')
const positionModel = require('../models/postion')
const BScroll = require('better-scroll')
const positionListView = require('../views/position-list.art')
class Position {
    constructor() {      
        this.list = []
        this.pageNo = 1
        this.totalCount = 0
        this.pageSize = 15

    }
    renderer(list) {
        let positionListHtml = positionListView({
            list
        })
        $('main ul').html(positionListHtml);

    }

    async  render() {      
        let that = this
        let result = await positionModel.get({
            pageNo: this.pageNo
        })
        // 把PositionView 先装填到main里
        let positionHtml = positionView({})
        let $main = $('main')
        $main.html(positionHtml)        
        let $imgHead = $('.head img')
        let $imgFoot = $('.foot img')

        //this.list  必须要 给他 赋值  因为后期还会用到这个数组的值 
        let list = this.list = result.content.data.page.result
        that.totalCount = result.content.data.page.totalCount
        // 在把list  传进到li  
        //   console.log(list)
        this.renderer(list)
      
        let bScroll = new BScroll.default($main.get(0), {
            probeType: 2//只要加上这个  就能实时监控scroll事件。
        })
        // 开始的时候我们要隐藏刷新的按钮
        bScroll.scrollBy(0, -40)
        bScroll.on('scroll', function () {
            // 点击鼠标滚动的时候 就会触发  松开鼠标时候就不触发这个事件了
            //  这里的this  是BScroll  
            // console.log(this.y)
            if (this.y >=0) {
                $imgHead.addClass('up')
            }
            if (this.maxScrollY > this.y) {
                $imgFoot.addClass('down')
            }


        })

        bScroll.on('scrollEnd', async function () {
            $imgHead.removeClass('down').addClass('up')
            if (this.y >= 0) {                               
               $imgHead.attr('src','/assets/images/ajax-loader.gif')
                // 当图片变为loading 的时候 我们要 去请求ajax数据  进行渲染  然后在在请求到数据之后 我们要在这恶鬼之后进行。
                let result = await positionModel.get({
                    pageNo: that.pageNo,
                    pageSize: 1
                })
                // console.log(result) 这里  就可以拿到 刷新(也就是再一次发送请求的那一条数据)
                let { result: list } = result.content.data.page
                // 使用es6  实现两个数组的合并
                that.list = [...list, ...that.list]
                that.renderer(that.list)
                bScroll.scrollBy(0, -40)
            }

            // 上拉加载更多
            if (this.maxScrollY >= this.y && Math.ceil(that.totalCount / that.pageSize) >= that.pageNo) {
                that.pageNo++
                $imgFoot.attr("src", '/assets/images/ajax-loader.gif')
                // 我们需要重新发起ajax
                let result = await positionModel.get({
                    pageNo: that.pageNo,
                    pageSize: that.pageSize
                })
                let { result: list, totalCount } = result.content.data.page
                that.totalCount = totalCount
                that.list = [...that.list, ...list]
                that.renderer(that.list)
                bScroll.scrollBy(0, 40)
                $imgHead.attr('src', '/assets/imag es/arrow.png')
                $imgHead.removeClass('down')
            }

        })




    }
}
export default new Position()