import webpack from "webpack-stream";

export const js = () => {
	// Получаем файлы
	return app.gulp.src(app.path.src.js, {
			sourcemaps: app.isDev
		})
		// Обработка ошибок во время компиляции
		.pipe(app.plugins.plumber(
			// Выводит сообщения об ошибках
			app.plugins.notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			})
		))
		// 
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development',
			output: {
				filename: "app.min.js",
			}
		}))
		// Выгружаем полученные файлы в указанную папку
		.pipe(app.gulp.dest(app.path.build.js))
		// Обновляем браузер
		.pipe(app.plugins.browsersync.stream());
}