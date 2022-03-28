import replace from "gulp-replace";
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify";
import browsersync from "browser-sync";
import newer from "gulp-newer";
import ifPlugin from "gulp-if"; //Условное ветвление

export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   browsersync: browsersync,
   newer: newer,
   if: ifPlugin
}
