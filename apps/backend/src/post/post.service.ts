import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './DTO/create-post.dto';
import { SearchQueryDto } from './DTO/search-query.dto';
import { UpdatePostDto } from './DTO/update-post.dto';
import { Post } from './post.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostService {
	constructor(
		private readonly postRepository: PostRepository,
		private readonly authService: AuthService
	) {}

	async createPost(createPostData: CreatePostDto): Promise<Post> {
		const newPost = await this.postRepository.createPost(createPostData);

		return newPost;
	}

	async searchPost(
		query: SearchQueryDto
	): Promise<{ postInfos: Post[]; totalCount: number; totalPage: number }> {
		const posts = await this.postRepository.searchPost(query);

		return posts;
	}

	async getPostById(id: string): Promise<Post> {
		const post = await this.postRepository.getPostById(id);

		if (!post) {
			throw new NotFoundException(`Post with Id ${id} not found`);
		}

		return post;
	}

	async updatePostById(
		id: string,
		userId: string,
		updatePostDto: UpdatePostDto
	): Promise<Post> {
		await this.authService.validatePost(id, userId);

		const updatePost = await this.postRepository.updatePostById(
			id,
			updatePostDto
		);

		if (!updatePost) {
			throw new NotFoundException(`Post with ID ${id} not found`);
		}

		return updatePost;
	}

	async deletePostById(
		id: string,
		userId: string
	): Promise<{ deletedCount: number }> {
		await this.authService.validatePost(id, userId);

		const deletePost = await this.postRepository.deletePostById(id);

		if (!deletePost) {
			throw new NotFoundException(`Post with ID ${id} not found`);
		}

		return deletePost;
	}
}
