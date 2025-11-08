import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://priyanshu:iamhere@cluster0.d2vwo.mongodb.net/moviedb?appName=Cluster0',
    ),
    UsersModule,
    AuthModule,
    MoviesModule,
  ],
})
export class AppModule {}
