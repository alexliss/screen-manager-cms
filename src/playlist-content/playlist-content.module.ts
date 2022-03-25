import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntity } from './entity/content.entity';
import { PlaylistContentController } from './playlist-content.controller';
import { PlaylistContentEntity } from './entity/playlist-content.entity';
import { PlaylistContentService } from './playlist-content.service';
import { PlaylistEntity } from './entity/playlist.entity';
import { BucketModule } from 'src/bucket/bucket.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlaylistEntity, ContentEntity, PlaylistContentEntity]),
        BucketModule,
        ConfigModule.forRoot({ envFilePath: ["s3.env"] })
    ],
    providers: [PlaylistContentService],
    controllers: [PlaylistContentController],
    exports: [PlaylistContentService]
})
export class PlaylistContentModule {}
