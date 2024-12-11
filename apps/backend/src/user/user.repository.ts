import * as crypto from 'crypto';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import { hashedPassword } from 'src/utils/hashedPassword';

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	async createUser({
		userId,
		userName,
		password,
	}: CreateUserDto): Promise<User> {
		const newUser = new this.userModel({
			userId,
			userName,
			password: hashedPassword(password),
		});

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
		if (password) updateData.password = hashedPassword(password);

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

	async getUser(userId: string, password: string) {
		const ret = await this.userModel
			.findOne(
				{ userId, password: hashedPassword(password) },
				{ _v: 0, password: 0 }
			)
			.lean();

		return { id: ret.userId, name: ret.userName };
	}
}
