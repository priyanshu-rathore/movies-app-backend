import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  publishingYear: number;

  @Prop()
  poster?: string; // image URL/path

  // Foreign key reference to User
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
