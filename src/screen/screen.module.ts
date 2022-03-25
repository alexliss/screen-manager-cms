import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { ScreenEntity } from './screen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistContentModule } from 'src/playlist-content/playlist-content.module';

@Module({
  providers: [ScreenService],
  controllers: [ScreenController],
  imports: [TypeOrmModule.forFeature([ScreenEntity]), PlaylistContentModule]
})
export class ScreenModule {}
