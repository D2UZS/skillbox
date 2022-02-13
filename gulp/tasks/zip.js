import del from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
	// Удаляем zip архив, который возможно уже существует
	del(`./${app.path.rootFolder}.zip`);
	// Получаем файлы
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		// Обработка ошибок во время компиляции
		.pipe(app.plugins.plumber(
			// Выводит сообщения об ошибках
			app.plugins.notify.onError({
				title: "ZIP",
				message: "Error: <%= error.message %>"
			})
		))
		// Выгружаем полученные файлы в указанную папку
		.pipe(zipPlugin(`${app.path.rootFolder}.zip`))
		// Выгружаем полученные файлы в указанную папку
		.pipe(app.gulp.dest('./'));
}