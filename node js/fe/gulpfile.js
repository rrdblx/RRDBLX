const gulp = require('gulp')

const server = require('gulp-webserver')

const watch = require('gulp-watch')

const sass = require('gulp-sass')

const webpack = require('webpack-stream')

const proxy = require('http-proxy-middleware')





//gulp与webpack区别 gulp是一个自动化任务执行工具，webpack是一个模块打包工具
gulp.task('server', gulp.series(() => {
    return gulp.src('./dev')
    .pipe( 
        server({
            host:'localhost',
            port:8080,
            livereload:true,
            directoryListing:{
                enable:true,
                path:'./dev'
            },
            middleware:[
                proxy('/api',{
                    target:'http://localhost:3000',
                    changeOrigin:true
                })
            ]
        //        middleware: {
              
        //       proxy : {
        //           '/api':{
        //         target: 'http://localhost:3000',
            
        //        changeOrigin: true,
        //        pathRewrite:{
        //            "^/api":"/"
        //        }
        //      }
        //   }
        //     }
            
    //     proxies : [
    //         {//http反向代理
    //         source: "/api",
    //         target:"http://localhost:3000"
    //     }
    // ]
  
        })
    )
}))

gulp.task('scss',gulp.series(()=>{
      return gulp.src('./src/styles/app.scss',{allowEmpty:true})
      .pipe(sass().on('error',sass.logError))
      .pipe(gulp.dest('./dev/styles'))
}))
//commonjs:JS模块化开发
gulp.task('js',gulp.series(()=>{
    return gulp.src('./src/scripts/*.js')
    .pipe(
        webpack({
            //webpack v4 要求定义配置模式：development,production
            mode:'development',
            //入口
            entry:'./src/scripts/app.js',
            //出口
            output:{
                filename:'app.js'
            },
            module:{
                rules:[{
                
                    test:/\.html$/,
                    loader:'string-loader'
                }]
            }
        })
    )
    .pipe(gulp.dest('./dev/scripts'))
}))
 gulp.task('watch',function(done){
    gulp.watch('./src/*.html',gulp.series('copyhtml'))
    gulp.watch('./src/scripts/**/*',gulp.series('js'))
    gulp.watch('./src/styles/**/*',gulp.series('scss'))
    
         done()
    
});



gulp.task('copyhtml',gulp.series(() =>{     
    return gulp.src('./src/*.html',{allowEmpty:true})
    .pipe(gulp.dest('./dev/'))
}))
gulp.task('copylibs',gulp.series(() =>{     
    return gulp.src('./src/libs/**/*',{allowEmpty:true})
    .pipe(gulp.dest('./dev/libs/'))
}))
gulp.task('copystatic',gulp.series(() =>{     
    return gulp.src('./src/static/**/*',{allowEmpty:true})
    .pipe(gulp.dest('./dev/static/'))
}))

 
gulp.task('default', gulp.series("copyhtml","copylibs","copystatic","scss","js","server","watch"),() => {
    console.log('server is running at localhost:8080.')
})