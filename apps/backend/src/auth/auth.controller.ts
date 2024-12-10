import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/user/DTO/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly userService: UserService) {}

	@Post('signup')
	async signupUser(
		@Body() createUserDto: CreateUserDto
	): Promise<{ message: string; newUser: CreateUserDto }> {
		const newUser = await this.userService.createUser(createUserDto);

		return { message: 'User created successfully', newUser };
	}

	@Post('login')
	async loginUser(
		@Body() { userId, password }: { userId: string; password: string },
		@Request() req: any
	) {
		const user = await this.userService.login(userId, password);

		req.session.isLoggedIn = true;
		req.session.user = {
			userId: user.id,
			userName: user.name,
		};

		return { message: 'Login successfully', user };
	}

	@Post('logout')
	async logoutUser(@Request() req: any) {
		if (req.session.user) {
			req.session.destroy((err) => {
				if (err) {
					throw new Error('Logout failed');
				}
			});
			return { message: 'Logout successfully' };
		} else {
			return { message: 'You are not logged in' };
		}
	}

	@Get('session')
	getSession(@Request() req: any) {
		return {
			isLoggedIn: req.session.isLoggedIn || false,
			user: req.session.user || null,
		};
	}
}
