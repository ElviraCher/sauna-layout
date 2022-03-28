import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss"; //вывод изображений в формате webp
import autoPrefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
   return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
         })
      ))
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(sass({
         outputStyle: 'expanded'
      }))
      .pipe(
         app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            webpcss(
               {
                  webpClass: ".webp", //если браузер поддерживает формат webp, то добавляем класс
                  noWebpClass: ".no-webp"
               }
            )
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            autoPrefixer({
               grid: true,
               overrideBrowserlist: ["last 3 versions"],
               cascade: true
            })
         )
      )
      .pipe(app.gulp.dest(app.path.build.css)) //если нужен не сжатый файлик со стилями
      .pipe(cleanCss())
      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream());
}