import fileInclude from "gulp-file-include";
// Оборачивает img в picture и подключает webp
import webHtmlNosvg from "gulp-webp-html-nosvg";
// Добавляет ключи (в виде текущей даты и времени) в название файлов стилей и скриптов, что бы они не кэшировались
import versionNumber from "gulp-version-number";

export const html = () => {
  // Получаем файлы
  return (
    app.gulp
      .src(app.path.src.html)
      // Обработка ошибок во время компиляции
      .pipe(
        app.plugins.plumber(
          // Выводит сообщения об ошибках
          app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Запускает шаблонизатор
      .pipe(fileInclude())
      // Заменяет пути к картинкам
      .pipe(app.plugins.replace(/@img\//g, "img/"))
      // Запускается только в режиме итоговой сборки
      .pipe(
        app.plugins.if(
          app.isBuild,
          // Обрабатывает изображения, добавляет вывод webp
          webHtmlNosvg()
        )
      )
      // Запускается только в режиме итоговой сборки
      .pipe(
        app.plugins.if(
          app.isBuild,
          // Добавляет ключи к именам файлов со стилями и скриптами, что бы не кэшировались
          versionNumber({
            value: "%DT%",
            append: {
              key: "_v",
              cover: 0,
              to: ["css", "js"],
            },
            output: {
              file: "gulp/version.json",
            },
          })
        )
      )
      // Копирует получившиеся файлы в указанную папку
      .pipe(app.gulp.dest(app.path.build.html))
      // Обновляем локальный сервер
      .pipe(app.plugins.browsersync.stream())
  );
};
