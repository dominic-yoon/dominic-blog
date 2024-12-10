import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':userId')
	async getUserById(
		@Param('userId') userId: string
	): Promise<User | { message: string }> {
		const user = await this.userService.getUserById(userId);

		return user || { message: 'User not found' };
	}

	@Put()
	async updateUserById(
		@Body() updateUserDto: UpdateUserDto
	): Promise<{ message: string; updateUser: UpdateUserDto }> {
		const updateUser = await this.userService.updateUserById(updateUserDto);

		return { message: 'User updated successfully', updateUser };
	}

	@Delete(':userId')
	async deleteUserById(
		@Param('userId') userId: string
	): Promise<{ message: string }> {
		await this.userService.deleteUserById(userId);

		return { message: 'User deleted successfully' };
	}
}
