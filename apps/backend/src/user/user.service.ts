import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async createUser({ userId, userName, password }: User) {
		const existingUser = await this.userRepository.findUserById(userId);

		if (existingUser) {
			throw new Error('Id already exists');
		}

		if (!userId || typeof userId !== 'string') {
			throw new Error('Invalid userId');
		}

		if (!userName || typeof userName !== 'string') {
			throw new Error('Invalid userName');
		}

		if (!password || typeof password !== 'string') {
			throw new Error('Invalid password');
		}

		const newUser = await this.userRepository.createUser({
			userId,
			userName,
			password,
		});
		return newUser;
	}

	async getUserById(id: string) {
		const user = await this.userRepository.findUserById(id);

		return user;
	}

	async updateUserById(updateUserDto: any) {
		if (!updateUserDto.userId || typeof updateUserDto.userId !== 'string') {
			throw new Error('Invalid userId');
		}

		const updateUser =
			await this.userRepository.updateUserById(updateUserDto);

		return updateUser;
	}

	async deleteUserById(userId: string) {
		const deleteUser = await this.userRepository.deleteUser(userId);

		return deleteUser;
	}
}
