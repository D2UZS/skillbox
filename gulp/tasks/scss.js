// Компилятор scss
import dartSass from "sass";
import gulpSass from "gulp-sass";
// Переименовывает файлы
import rename from "gulp-rename";
// Сжимает css файлы
import cleanCss from "gulp-clean-css";
// Вывод webp изображений
import webpcss from "gulp-webpcss";
// Добавляет вендорные префиксы
import autoprefixer from "gulp-autoprefixer";
// Группирует медиа запросы
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
	// Получаем файлы
	return app.gulp.src(app.path.src.scss, {
			sourcemaps: app.isDev
		})
		// Обработка ошибок во время компиляции
		.pipe(app.plugins.plumber(
			// Выводит сообщения об ошибках
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})
		))
		// Заменяет пути к картинкам
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		// Компилируем sass
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		// Запускается только в режиме итоговой сборки
		.pipe(
			app.plugins.if(
				app.isBuild,
				// Группирует медиазапросы
				groupCssMediaQueries()
			)
		)
		// Запускается только в режиме итоговой сборки
		.pipe(
			app.plugins.if(
				app.isBuild,
				// Добавляет префиксы
				autoprefixer({
					grid: true,
					overrideBrowserlist: ["last 3 versions"],
					cascade: true
				})
			)
		)
		// Запускается только в режиме итоговой сборки
		.pipe(
			app.plugins.if(
				app.isBuild,
				// 
				webpcss({
					webpClass: ".webp",
					noWebpClass: ".no-webp"
				})
			)
		)
		// Раскоментировать если нужен не минифицированный дубль файла стилей
		.pipe(app.gulp.dest(app.path.build.css))
		// Запускается только в режиме итоговой сборки
		.pipe(
			app.plugins.if(
				app.isBuild,
				// Минифицирует файл
				cleanCss()
			)
		)
		// Переименовываем файлы стилей
		.pipe(rename({
			extname: ".min.css"
		}))
		// Выгружаем полученные файлы в указанную папку
		.pipe(app.gulp.dest(app.path.build.css))
		// Обновляем браузер
		.pipe(app.plugins.browsersync.stream());
}