import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import mongoose, { Model } from 'mongoose';
import { CreatePostDto } from './DTO/create-post.dto';
import { SearchQueryDto } from './DTO/search-query.dto';
import { UpdatePostDto } from './DTO/update-post.dto';
import { User } from 'src/user/user.schema';

const transformUser = (post: any): PostDocument => {
	const { _id, author, ...rest } = post;

	return {
		id: _id.toString(),
		author: author.userId,
		...rest,
	};
};

@Injectable()
export class PostRepository {
	constructor(
		@InjectModel(Post.name) private readonly postModel: Model<Post>,
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	async createPost(createPostData: CreatePostDto) {
		const newPost = this.postModel.create(createPostData);

		return newPost;
	}

	async searchPost({
		page = 1,
		limit = 10,
		keyword,
		filters,
	}: SearchQueryDto) {
		const skip = (page - 1) * limit;

		const searchQuery = await this.buildSearchQuery(filters, keyword);

		const posts = await this.postModel
			.find(searchQuery)
			.sort({ createdAt: -1 })
			.populate('author', 'userId')
			.skip(skip)
			.limit(limit)
			.lean();

		const totalCount = await this.postModel.countDocuments(searchQuery);

		const totalPage = Math.ceil(totalCount / limit);

		return {
			postInfos: posts.map((post) => transformUser(post)),
			totalCount,
			totalPage,
		};
	}

	private async buildSearchQuery(filters: string, keyword: string) {
		if (filters === 'title') {
			return { title: { $regex: keyword, $options: 'i' } };
		}

		if (filters === 'contents') {
			return { contents: { $regex: keyword, $options: 'i' } };
		}

		if (filters === 'author') {
			if (!keyword || keyword.trim() === '') {
				return {};
			}

			const author = await this.userModel
				.findOne({ userId: { $regex: keyword, $options: 'i' } })
				.lean();

			if (author) {
				return { author: author._id };
			} else {
				return { _id: null };
			}
		}

		if (keyword && keyword.trim() !== '') {
			return { $text: { $search: keyword } };
		}

		return {};
	}

	async getPostById(id: string) {
		const post = await this.postModel
			.findOne({ _id: new mongoose.Types.ObjectId(id) }, { _v: 0 })
			.populate('author', 'userName')
			.lean();

		return post;
	}

	async updatePostById(id: string, { title, contents }: UpdatePostDto) {
		const updateData: any = {};
		if (title) updateData.title = title;
		if (contents) updateData.contents = contents;

		const updatePost = await this.postModel.findOneAndUpdate(
			{ _id: id },
			{ $set: updateData },
			{ new: true }
		);

		return updatePost;
	}

	async deletePostById(id: string) {
		const deletePost = await this.postModel.deleteOne({ _id: id });

		return deletePost;
	}

	async getPostAuthorById(id: string) {
		const author = await this.postModel
			.findById(id)
			.populate('author', 'userId')
			.select('author')
			.lean();

		return author;
	}
}
