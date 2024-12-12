import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
	],
	providers: [PostRepository, PostService],
	controllers: [PostController],
	exports: [PostRepository],
})
export class PostModule {}
