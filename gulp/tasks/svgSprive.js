import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
	// Получаем файлы
	return app.gulp.src(`${app.path.src.svgicons}`, {})
		// Обработка ошибок во время компиляции
		.pipe(app.plugins.plumber(
			// Выводит сообщения об ошибках
			app.plugins.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(svgSprite({
			mode: {
				stack: {
					// Где создасться файл
					sprite: `../icons/icons.svg`,
					// Создавать страницу с перечнем иконок
					example: true
				}
			}
		}))
		// Копирует получившиеся файлы в указанную папку
		.pipe(app.gulp.dest(app.path.build.html))
}