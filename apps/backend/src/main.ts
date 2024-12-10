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

	const port = configService.get<number>('BACKEND_PORT');

	await app.listen(port ?? 4000);
}

bootstrap();
