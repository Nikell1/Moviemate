import webp from "gulp-webp"
// import imagemin from "gulp-imagemin" не работает на новых nodeJs

export const images = (done) => {
    done()
    return app.gulp.src(app.path.src.images, {encoding: false})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                messsage: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(webp())
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.gulp.src(app.path.src.images))
        .pipe(app.plugins.newer(app.path.build.images))
        // .pipe(imagemin({
        //     progressive: true,
        //     svgoPlugins: [{ removeViewBox: false }],
        //     interlaced: true,
        //     optimizationLevel: 3
        // }))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.gulp.src(app.path.src.svg))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browsersync.stream());
}