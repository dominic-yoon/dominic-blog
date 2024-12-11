import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const { userId } = createUserDto;
		const existingUser = await this.userRepository.findUserById(userId);

		if (existingUser) {
			throw new BadRequestException('User Id already exists');
		}

		return await this.userRepository.createUser(createUserDto);
	}

	async getUserById(userId: string): Promise<User> {
		const user = await this.userRepository.findUserById(userId);

		if (!user) {
			throw new NotFoundException(`User with Id ${userId} not found`);
		}

		return user;
	}

	async updateUserById(updateUserDto: UpdateUserDto): Promise<User> {
		const updateUser =
			await this.userRepository.updateUserById(updateUserDto);

		if (!updateUser) {
			throw new NotFoundException(`User with ID ${updateUser} not found`);
		}

		return updateUser;
	}

	async deleteUserById(userId: string): Promise<void> {
		const deleteUser = await this.userRepository.findUserById(userId);

		if (!deleteUser) {
			throw new NotFoundException(`User with ID ${deleteUser} not found`);
		}

		await this.userRepository.deleteUser(userId);
	}

	async login(userId: string, password: string) {
		const user = await this.userRepository.getUser(userId, password);

		if (!user) {
			throw new NotFoundException(`User with ID ${userId} not found`);
		}

		return user;
	}
}
