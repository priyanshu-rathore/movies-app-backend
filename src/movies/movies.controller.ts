import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/CreateMovieDto';
import { UpdateMovieDto } from './dto/UpdateMovieDto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // Create movie (poster as file, converted to Base64 here)
  @Post()
  @UseInterceptors(FileInterceptor('poster'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: CreateMovieDto) {
    const { title, publishingYear, user_id } = body;

    if (!title || !publishingYear || !user_id) {
      throw new BadRequestException('title, publishingYear, and user_id are required');
    }

    if (file) {
      const base64 = file.buffer.toString('base64');
      const mimeType = file.mimetype;
      body.poster = `data:${mimeType};base64,${base64}`;
    }

    return this.moviesService.create(body);
  }

  // Paginated endpoints unchanged...
  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 8) {
    return this.moviesService.findAllPaginated(Number(page), Number(limit));
  }

  @Get('user/:userId')
  async findAllByUser(
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 8,
  ) {
    return this.moviesService.findAllByUserPaginated(userId, Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  // MODIFIED UPDATE ENDPOINT TO ACCEPT FILE & UPDATE POSTER IF PROVIDED
  @Patch(':id')
  @UseInterceptors(FileInterceptor('poster'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    if (file) {
      const base64 = file.buffer.toString('base64');
      const mimeType = file.mimetype;
      updateMovieDto.poster = `data:${mimeType};base64,${base64}`;
    }
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
