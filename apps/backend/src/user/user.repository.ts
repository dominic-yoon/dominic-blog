import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const newUser = new this.userModel(createUserDto);

		return await newUser.save();
	}

	async findUserById(userId: string): Promise<User | null> {
		return await this.userModel.findOne({ userId }).exec();
	}

	async updateUserById({
		userId,
		userName,
		password,
	}: UpdateUserDto): Promise<User | null> {
		const updateData: any = {};
		if (userName) updateData.userName = userName;
		if (password) updateData.password = password;

		const ret = await this.userModel.findOneAndUpdate(
			{ userId },
			{ $set: updateData },
			{ new: true }
		);

		return ret;
	}

	async deleteUser(userId: string): Promise<void> {
		await this.userModel.deleteOne({ userId }).exec();
	}
}
