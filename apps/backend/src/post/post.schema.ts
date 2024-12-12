import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({
	collection: 'post',
	bufferCommands: true,
	timestamps: true,
})
export class Post {
	@Prop({ type: String, required: true })
	title: string;

	@Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
	author: Types.ObjectId;

	@Prop({ type: String, required: true })
	contents: string;

	@Prop({ type: Number, default: 0 })
	comments: number;

	@Prop({ type: Number, default: 0 })
	likes: number;
}

const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({ title: 'text', contents: 'text' });

export { PostSchema };
