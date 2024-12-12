import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
} from '@nestjs/common';
import { PostRepository } from 'src/post/post.repository';

@Injectable()
export class AuthService {
	constructor(private readonly postRepository: PostRepository) {}

	async validatePost(postId: string, userId: string) {
		const { author } = await this.postRepository.getPostAuthorById(postId);

		console.log(author);

		if (!author) {
			throw new BadRequestException(`Post with ID ${postId} not found`);
		}

		if (author.userId !== userId) {
			throw new UnauthorizedException(
				`User with ID ${userId} is not authorized to modify this post`
			);
		}
	}
}
