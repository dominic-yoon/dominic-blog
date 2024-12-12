import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './DTO/create-post.dto';
import { SearchQueryDto } from './DTO/search-query.dto';
import { UpdatePostDto } from './DTO/update-post.dto';
import { Post as PostEntity } from './post.schema';

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post('new')
	async createPost(
		@Body() createPostData: CreatePostDto
	): Promise<{ success: boolean; message: string; data: PostEntity }> {
		const newPost = await this.postService.createPost(createPostData);

		return {
			success: true,
			message: 'Created post successfully',
			data: newPost,
		};
	}

	@Get()
	async searchPost(
		@Query() query: SearchQueryDto
	): Promise<{ success: boolean; message: string; data: any }> {
		const posts = await this.postService.searchPost(query);

		return {
			success: true,
			message: 'Fetched posts successfully',
			data: posts,
		};
	}

	@Get(':id')
	async getPostById(
		@Param('id') id: string
	): Promise<{ success: boolean; message: string; data: PostEntity }> {
		const post = await this.postService.getPostById(id);

		return {
			success: true,
			message: 'Fetched post successfully',
			data: post,
		};
	}

	@Put(':id')
	async updatePostById(
		@Param('id') id: string,
		@Body() updatePostDto: UpdatePostDto
	): Promise<{ success: boolean; message: string; data: PostEntity }> {
		const updatedPost = await this.postService.updatePostById(
			id,
			updatePostDto
		);

		return {
			success: true,
			message: 'Updated post successfully',
			data: updatedPost,
		};
	}

	@Delete(':id')
	async deletePostById(
		@Param('id') id: string
	): Promise<{ success: boolean; message: string }> {
		await this.postService.deletePostById(id);

		return {
			success: true,
			message: 'Deleted post successfully',
		};
	}
}
