import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
	collection: 'user',
	bufferCommands: true,
	timestamps: true,
})
export class User {
	@Prop({ type: String, required: true, unique: true })
	userId: string;

	@Prop({ type: String, required: true })
	userName: string;

	@Prop({ type: String, required: true })
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
