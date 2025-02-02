import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	author: string;

	@IsString()
	@IsNotEmpty()
	contents: string;
}
