import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntity } from './entity/content.entity';
import { PlaylistContentController } from './playlist-content.controller';
import { PlaylistContentEntity } from './entity/playlist-content.entity';
import { PlaylistContentService } from './playlist-content.service';
import { PlaylistEntity } from './entity/playlist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PlaylistEntity, ContentEntity, PlaylistContentEntity])],
    providers: [PlaylistContentService],
    controllers: [PlaylistContentController],
    exports: []
})
export class PlaylistContentModule {}
