import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMovieDto } from './dto/CreateMovieDto';
import { UpdateMovieDto } from './dto/UpdateMovieDto';
import { Movie, MovieDocument } from './schema/movies.schema';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    let user_id;
    // Convert user_id to ObjectId if it's a string
    if (createMovieDto.user_id && typeof createMovieDto.user_id === 'string') {
      user_id = new Types.ObjectId(createMovieDto.user_id);
    }
    const created = new this.movieModel({ ...createMovieDto, user_id });
    return created.save();
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  // Paginated for all users
  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<{ movies: Movie[]; totalPages: number }> {
    const skip = (page - 1) * limit;
    const [movies, total] = await Promise.all([
      this.movieModel.find().skip(skip).limit(limit).exec(),
      this.movieModel.countDocuments().exec(),
    ]);
    return { movies, totalPages: Math.ceil(total / limit) };
  }

  async findAllByUser(userId: string): Promise<Movie[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Invalid user ID');
    }
    return this.movieModel.find({ user_id: new Types.ObjectId(userId) }).exec();
  }

  // Paginated for one user
  async findAllByUserPaginated(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ movies: Movie[]; totalPages: number }> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Invalid user ID');
    }
    const skip = (page - 1) * limit;
    const [movies, total] = await Promise.all([
      this.movieModel
        .find({ user_id: new Types.ObjectId(userId) })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.movieModel.countDocuments({ user_id: new Types.ObjectId(userId) }).exec(),
    ]);
    return { movies, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const updated = await this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Movie not found');
    return updated;
  }

  async remove(id: string): Promise<Movie> {
    const deleted = await this.movieModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Movie not found');
    return deleted;
  }
}
