import foo from './views/foo'
import bar from './views/bar'
const Routes = {
    '/foo':foo,
    '/bar':bar
}

// Router类，用来控制页面根据URL切换
class Router{
   start(){
       window.addEventListener('popstate',()=>{
           this.load(location.pathname)
       })
       this.load(location.pathname)
   }
   // 前往 path，变更地址栏 URL，并加载相应页面
   go(path){
       // 变更地址栏 URL
       history.pushState({},'',path)
       // 加载页面
       this.load(path);
   }
   load(path){
        if(path === '/') path = '/foo'
        // 创建页面实例
        const view = new Routes[path]();
        view.mount(document.body);
   }
}

export default new Router()