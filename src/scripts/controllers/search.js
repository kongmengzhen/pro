const searchView=require('../views/search.art')
class Search{
    render(){
        let html =searchView()
        $('main').html(html)

    }   
}
export default new Search()