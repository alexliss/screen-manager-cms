import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ContentEntity } from './entity/content.entity';
import { ContentRequestDto } from './dto/content-request.dto';
import { PlaylistRequestDto } from './dto/playlist-request.dto';
import { ManyPlaylistsResponseDto } from './dto/many-playlists-response.dto';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { PlaylistContentEntity } from './entity/playlist-content.entity';
import { PlaylistEntity } from './entity/playlist.entity';
import { PlaylistContentRequestDto } from './dto/playlist-content-request.dto';

@Injectable()
export class PlaylistContentService {
    constructor(
        @InjectRepository(PlaylistEntity) private readonly playlistRepo: Repository<PlaylistEntity>,
        @InjectRepository(ContentEntity) private readonly contentRepo: Repository<ContentEntity>,
        @InjectRepository(PlaylistContentEntity) private readonly playlistContentRepo: Repository<PlaylistContentEntity>
    ) {}

    async createPlaylist(user: UserEntity, data: PlaylistRequestDto) {
        const playlist = await this.playlistRepo.save(new PlaylistEntity(user, data.name))
        return new PlaylistResponseDto(playlist)
    }

    async addContentInPlaylist(playlistId: string, data: ContentRequestDto): Promise<PlaylistResponseDto> {
        let playlist = await this.getPlaylistWithContent(playlistId)
        const content = await this.getContent(data.link)
        const newContent = new PlaylistContentEntity(content, playlist, data.duration, playlist.content.length)
        playlist.content.push(newContent)
        await this.contentRepo.save(content)
        await this.playlistContentRepo.save(newContent)
        return new PlaylistResponseDto(playlist)
    }

    async getPlaylistById(id: string): Promise<PlaylistResponseDto> {
        return new PlaylistResponseDto(await this.getPlaylistWithContent(id))
    }

    async getAllUserPlaylists(user: UserEntity) {
        const playlists = await this.playlistRepo.find({
            where: {
                userId: user.id
            },
            relations: ["content"]
        })
        playlists.forEach(playlist => {
            playlist.content = this.playlistContentSort(playlist.content)
        });

        return new ManyPlaylistsResponseDto(playlists)
    }

    async changePlaylistName(id: string, data: PlaylistRequestDto): Promise<PlaylistResponseDto> {
        let playlist = await this.getPlaylistWithContent(id)
        playlist.name = data.name
        playlist = await this.playlistRepo.save(playlist)
        return new PlaylistResponseDto(playlist)
    }

    async changeContentInPlaylist(
        playlistId: string, 
        contentOrder: number, 
        data: PlaylistContentRequestDto
    ): Promise<PlaylistResponseDto> {
        const playlist = await this.getPlaylistWithContent(playlistId)
        let { content } = playlist;
        if (!content[contentOrder]) {
            throw new NotFoundException('content not found')
        }

        if (data.link) {
            content[contentOrder].content = await this.getContent(data.link)
            this.playlistContentRepo.save(content[contentOrder])
        }

        if (data.duration) {
            if (data.duration >= 0) {
                content[contentOrder].duration = data.duration
            } else {
                throw new BadRequestException
            }
        }

        if (data.order) {
            if (data.order < 0) {
                throw new BadRequestException
            }
            if (data.order > contentOrder) {
                const movingContent = content.splice(contentOrder, 1)
                if (data.order >= content.length) {
                    console.log(movingContent)
                    movingContent[0].order = content.length
                    console.log(movingContent)
                } else {
                    movingContent[0].order = data.order
                }
                for (let index = contentOrder; index < movingContent[0].order; index++) {
                    console.log(content[index])
                    content[index].order--;
                }
                content.push(movingContent[0])
            } else if (data.order < contentOrder) {
                const movingContent = content.splice(contentOrder, 1)
                movingContent[0].order = data.order
                for (let index = contentOrder - 1; index > data.order; index--) {
                    content[index].order++;
                }
                content.push(movingContent[0])
            }

        }
        console.log(content)
        content = await this.playlistContentRepo.save(content)
        playlist.content = this.playlistContentSort(content)

        return new PlaylistResponseDto(playlist)
    
    }

    async deletePlaylist(id: string) {
        this.playlistRepo.delete(id)
    } 

    async deleteContentFromPlaylist(playlistId: string, contentOrder: number) {
        const playlist = await this.getPlaylistWithContent(playlistId)
        const { content } = playlist
        const isDataValid = playlist && content && content.length && content[contentOrder]
        if (!isDataValid) {
            throw new BadRequestException
        }
        this.playlistContentRepo.delete(content[contentOrder])
        content.splice(contentOrder, 1)
        for (let index = contentOrder; index < content.length; index++) {
            content[index].order--;
        }
        
        await this.playlistContentRepo.save(content)
        playlist.content = content

        return new PlaylistResponseDto(playlist)
    }

    private async getContent(link: string): Promise<ContentEntity> {
        let content = await this.contentRepo.findOne({
            where: {
                link: link
            }
        })

        if (content) {
            return content
        }

        content = new ContentEntity(link)
        content = await this.contentRepo.save(content)

        return content
    }

    private async getPlaylistWithContent(id: string): Promise<PlaylistEntity> {
        const playlist = await this.playlistRepo.findOne(id, {
            relations: ['content']
        })
        if (!playlist) {
            throw new BadRequestException('playlist not found')
        }

        if (playlist.content.length) {
            playlist.content = this.playlistContentSort(playlist.content)
        }

        return playlist
    }

    private playlistContentSort(content: PlaylistContentEntity[]): PlaylistContentEntity[] {
        return content.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0))
    }
}
