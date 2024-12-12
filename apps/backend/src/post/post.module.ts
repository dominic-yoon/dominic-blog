import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { AuthService } from 'src/auth/auth.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Post.name, schema: PostSchema },
			{ name: User.name, schema: UserSchema },
		]),
	],
	providers: [PostRepository, PostService, AuthService],
	controllers: [PostController],
	exports: [PostRepository],
})
export class PostModule {}
