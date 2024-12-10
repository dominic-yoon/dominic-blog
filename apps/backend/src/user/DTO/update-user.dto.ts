import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
	@IsString()
	userId: string;

	@IsString()
	@IsOptional()
	userName?: string;

	@IsString()
	@IsOptional()
	password?: string;
}
