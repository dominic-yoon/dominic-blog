import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './DTO/create-post.dto';
import { SearchQueryDto } from './DTO/search-query.dto';
import { UpdatePostDto } from './DTO/update-post.dto';

@Injectable()
export class PostService {
	constructor(private readonly postRepository: PostRepository) {}

	async createPost(createPostData: CreatePostDto) {
		const newPost = await this.postRepository.createPost(createPostData);

		return newPost;
	}

	async searchPost(query: SearchQueryDto) {
		const posts = await this.postRepository.searchPost(query);

		return posts;
	}

	async getPostById(id: string) {
		const post = await this.postRepository.getPostById(id);

		if (!post) {
			throw new NotFoundException(`Post with Id ${post} not found`);
		}

		return post;
	}

	async updatePostById(id: string, updatePostDto: UpdatePostDto) {
		const updatePost = await this.postRepository.updatePostById(
			id,
			updatePostDto
		);

		if (!updatePost) {
			throw new NotFoundException(`Post with ID ${updatePost} not found`);
		}

		return updatePost;
	}

	async deletePostById(id: string) {
		const deletePost = await this.postRepository.deletePostById(id);

		if (!deletePost) {
			throw new NotFoundException(`Post with ID ${deletePost} not found`);
		}

		return deletePost;
	}
}
