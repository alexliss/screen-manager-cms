import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntity } from './content.entity';
import { PlaylistContentController } from './playlist-content.controller';
import { PlaylistContentEntity } from './playlist-content.entity';
import { PlaylistContentService } from './playlist-content.service';
import { PlaylistEntity } from './playlist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PlaylistEntity, ContentEntity, PlaylistContentEntity])],
    providers: [PlaylistContentService],
    controllers: [PlaylistContentController],
    exports: []
})
export class PlaylistContentModule {}
