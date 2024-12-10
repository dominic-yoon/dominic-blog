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

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('signup')
	async signup(@Body() createUserDto: User) {
		const newUser = await this.userService.createUser(createUserDto);

		return { message: 'User created successfully', newUser };
	}

	@Get(':userId')
	async getUserById(@Param('userId') userId: string) {
		const user = await this.userService.getUserById(userId);

		return user || { message: 'User not found' };
	}

	@Put()
	async updateUserById(@Body() updateUserDto: any) {
		const updateUser = await this.userService.updateUserById(updateUserDto);

		return { message: 'User updated successfully', updateUser };
	}

	@Delete(':userId')
	async deleteUserById(@Param('userId') userId: string) {
		const deleteUser = await this.userService.deleteUserById(userId);

		return { message: 'User deleted successfully', deleteUser };
	}
}
