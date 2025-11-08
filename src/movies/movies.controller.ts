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
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/CreateMovieDto';
import { UpdateMovieDto } from './dto/UpdateMovieDto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('poster'))
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Movie created successfully.' })
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: CreateMovieDto) {
    if (!body.title || !body.publishingYear || !body.user_id) {
      throw new BadRequestException('title, publishingYear, and user_id are required');
    }

    if (file) {
      const base64 = file.buffer.toString('base64');
      const mimeType = file.mimetype;
      body.poster = `data:${mimeType};base64,${base64}`;
    }

    return this.moviesService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies paginated' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 8) {
    return this.moviesService.findAllPaginated(Number(page), Number(limit));
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all movies by user' })
  async findAllByUser(
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 8,
  ) {
    return this.moviesService.findAllByUserPaginated(userId, Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movie by ID' })
  async findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('poster'))
  @ApiOperation({ summary: 'Update an existing movie' })
  @ApiConsumes('multipart/form-data')
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
  @ApiOperation({ summary: 'Delete a movie' })
  async remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
