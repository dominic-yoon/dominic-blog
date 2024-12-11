import * as session from 'express-session';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	// app.useGlobalPipes(
	// 	new ValidationPipe({
	// 		whitelist: true,
	// 		forbidNonWhitelisted: true,
	// 		transform: true,
	// 	})
	// );

	app.enableCors({
		origin: '*',
		credentials: true,
	});

	// 세션 미들웨어 설정
	app.use(
		session({
			secret: configService.get<string>('SESSION_KEY'),
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 3600000, // 1시간
			},
		})
	);

	const port = configService.get<number>('BACKEND_PORT');

	await app.listen(port ?? 4000);
}

bootstrap();
