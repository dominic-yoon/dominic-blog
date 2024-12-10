import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	async createUser(createUserDto: User): Promise<User> {
		const newUser = new this.userModel(createUserDto);

		return await newUser.save();
	}

	async findUserById(userId: string): Promise<User | null> {
		return await this.userModel.findOne({ userId }).exec();
	}

	async updateUserById({ userId, userName, password }: any) {
		const updateData: any = {};
		if (userName) updateData.userName = userName;
		if (password) updateData.password = password;

		const ret = await this.userModel.findOneAndUpdate(
			{ userId },
			{ $set: updateData },
			{ new: true }
		);

		if (!ret) {
			throw new NotFoundException(`User with ID ${userId} not found`);
		}

		return ret;
	}

	async deleteUser(userId: string): Promise<void> {
		await this.userModel.deleteOne({ userId }).exec();
	}
}
