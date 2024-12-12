import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Request,
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
		@Body() updatePostDto: UpdatePostDto,
		@Request() req: any
	): Promise<{ success: boolean; message: string; data: PostEntity }> {
		const userId = req.session.user.userId;
		const updatedPost = await this.postService.updatePostById(
			id,
			userId,
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
		@Param('id') id: string,
		@Request() req: any
	): Promise<{ success: boolean; message: string }> {
		const userId = req.session.user.userId;
		await this.postService.deletePostById(id, userId);

		return {
			success: true,
			message: 'Deleted post successfully',
		};
	}
}
