import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
	@IsNumber()
	@IsOptional()
	@Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : 1))
	page: number;

	@IsNumber()
	@IsOptional()
	@Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : 10))
	limit: number;

	@IsString()
	@IsOptional()
	keyword: string;

	@IsString()
	@IsOptional()
	filters?: string;
}
