import {
	configFTP
} from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
	// 
	configFTP.log = util.log;
	//
	const ftpConnect = vinylFTP.create(configFTP);
	// Получаем файлы
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		// Обработка ошибок во время компиляции
		.pipe(app.plugins.plumber(
			// Выводит сообщения об ошибках
			app.plugins.notify.onError({
				title: "FTP",
				message: "Error: <%= error.message %>"
			})
		))
		// Выгружаем полученные файлы в указанную папку
		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}