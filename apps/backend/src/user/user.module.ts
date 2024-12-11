import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UserController],
	providers: [UserRepository, UserService],
	exports: [UserService],
})
export class UserModule {}
