//引入依赖,要使用gulp，就先引入它
var gulp = require("gulp");
//引入这个插件,开启自己的服务器
var connect=require("gulp-connect");
//将less转化为css
var less=require("gulp-less");
var folder = {
    src :"src/",
    dist : "dist/"
}
//定义一个任务,任务名为"html",当执行这个任务时,就是执行后面的回调函数
gulp.task("html",function(){
    //将文件变成文件流(读取src/html下面的index.html文件)
    //如果是所有html,就是"html/*"
   var page=gulp.src(folder.src + "html/index.html")
                //当文件改变时，自动刷新浏览器
                .pipe(connect.reload());
        //对文件流进行一些操作        
        //将文件输出到 dist/html 中去
        page.pipe(gulp.dest(folder.dist+"html/"))
})
gulp.task("images",function(){
    gulp.src(folder.src + "img/*")
        .pipe(connect.reload())
        .pipe(gulp.dest(folder.dist +"image/"))
})
gulp.task("js",function(){
    var js=gulp.src(folder.src + "js/*")
                .pipe(connect.reload());    
        js.pipe(gulp.dest(folder.dist +"js/"))
})
gulp.task("css",function(){
    var css=gulp.src(folder.src + "css/*")
                //当文件改变时，自动刷新浏览器
                .pipe(connect.reload())
                .pipe(less()) ; 
        css.pipe(gulp.dest(folder.dist +"css/"))
})
//任务监听，自动执行任务的功能。当有文件改变时，自动执行对应的任务
gulp.task("watch",function(){
    gulp.watch(folder.src+"html/*",["html"]);
    // gulp.watch(folder.src+"images/*",["images"]);
    // gulp.watch(folder.src+"js/*",["js"]);
    gulp.watch(folder.src+"css/*",["css"]);
})
//开启一个服务器
gulp.task("server",function(){
    connect.server({
        //配置你选择的端口
        post:"8080",
        //当文件改变时，自动刷新浏览器(热启)
        livereload:true
    });
})
gulp.task("default",["html","css","images","watch","server"])