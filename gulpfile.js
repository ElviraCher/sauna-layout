import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
    isBuild: process.argv.includes('--build'), // хранит ли переменная флаг duild
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { deploy } from "./gulp/tasks/deploy.js";

function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprite }; //чтобы можно было отдельно вызывать команду для svg

//Последовательня обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

//Сценарии выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployGhPages = gulp.series(reset, mainTasks, deploy);

export { dev };
export { build };
export { deployGhPages };

//Сценарий по умолчанию
gulp.task("default", dev);
