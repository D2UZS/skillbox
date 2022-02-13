// 
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
	// Получаем файлы
	return app.gulp.src(app.path.src.images)
		// Обработка ошибок во время компиляции
		.pipe(app.plugins.plumber(
			// Выводит сообщения об ошибках
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			})
		))
		// Проверяем картинки в папке с результатом, что бы обрабатывать только нужные нам
		.pipe(app.plugins.newer(app.path.build.images))
		// Запускается только в режиме итоговой сборки
		.pipe(
			app.plugins.if(
				app.isBuild,
				// Создаем изображение в формате webp
				webp()
			)
		)
		// Запускается только в режиме итоговой сборки
		.pipe(
			app.plugins.if(
				app.isBuild,
				// Выгружаем полученные файлы в указанную папку
				app.gulp.dest(app.path.build.images)
			)
		)
		// Запускается только в режиме итоговой сборки
		.pipe(
			app.plugins.if(
				app.isBuild,
				// Опять получаем исходные файлы
				app.gulp.src(app.path.src.images)
			)
		)
		// Запускается только в режиме итоговой сборки
		.pipe(
			app.plugins.if(
				app.isBuild,
				// Опять проверяем картинки в папке с результатом, что бы обрабатывать только нужные нам
				app.plugins.newer(app.path.build.images)
			)
		)
		// Запускается только в режиме итоговой сборки
		.pipe(
			app.plugins.if(
				app.isBuild,
				// Сжимаем изображения
				imagemin({
					progressive: true,
					svgoPlugins: [{
						removeViewBox: false
					}],
					interlaced: true,
					optimizationLevel: 3 // 0 to 7
				})
			)
		)
		// Выгружаем полученные файлы в указанную папку
		.pipe(app.gulp.dest(app.path.build.images))
		// Получаем доступ к svg
		.pipe(app.gulp.src(app.path.src.svg))
		// Выгружаем полученные файлы в указанную папку
		.pipe(app.gulp.dest(app.path.build.images))
		// Обновляем браузер
		.pipe(app.plugins.browsersync.stream());
}