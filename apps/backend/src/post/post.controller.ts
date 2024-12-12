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

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post('new')
	async createPost(@Body() createPostData: CreatePostDto) {
		const newPost = await this.postService.createPost(createPostData);

		return { message: 'Created post successfully', newPost };
	}

	@Get()
	async searchPost(@Query() query: SearchQueryDto) {
		const posts = await this.postService.searchPost(query);

		return posts;
	}

	@Get(':id')
	async getPostById(@Param('id') id: string) {
		const post = await this.postService.getPostById(id);

		return post;
	}

	@Put(':id')
	async updatePostById(
		@Param('id') id: string,
		@Body() updatePostDto: UpdatePostDto
	) {
		const updatePost = await this.postService.updatePostById(
			id,
			updatePostDto
		);

		return { message: 'Updated Post successfully', updatePost };
	}

	@Delete(':id')
	async deletePostById(@Param('id') id: string) {
		const deletePost = await this.postService.deletePostById(id);

		return { message: 'Deleted Post successfully', deletePost };
	}
}
