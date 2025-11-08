import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  publishingYear: number | string;

  @IsOptional()
  @IsString()
  poster?: string;

  @IsString()
  user_id: string; // ObjectId of user
}
