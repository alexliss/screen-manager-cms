import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ScreenEntity } from './screen.entity';
import { PlaylistContentService } from 'src/playlist-content/playlist-content.service';
import { ScreenResponseWithPlaylistDto } from './dto/screen-response-with-playlist.dto';

@Injectable()
export class ScreenService extends TypeOrmCrudService<ScreenEntity> {
    constructor(
        @InjectRepository(ScreenEntity) readonly repo: Repository<ScreenEntity>,
        @Inject(PlaylistContentService) private readonly playlistContentService: PlaylistContentService) {
        super(repo)
    }

    async getScreen(id: string): Promise<ScreenResponseWithPlaylistDto> {
        const screen = await this.repo.findOne(id)
        if (!screen) {
            throw new NotFoundException
        }
        const { content } = await this.playlistContentService.getPlaylistWithResolution(screen.playlistId, screen.resolution)
        return new ScreenResponseWithPlaylistDto(screen, content)
    }
}
