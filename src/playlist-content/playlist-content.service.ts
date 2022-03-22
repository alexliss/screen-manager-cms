import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { BucketService } from 'src/bucket/bucket.service';

@Injectable()
export class PlaylistContentService {
    constructor(
        @InjectRepository(PlaylistEntity) private readonly playlistRepo: Repository<PlaylistEntity>,
        @InjectRepository(ContentEntity) private readonly contentRepo: Repository<ContentEntity>,
        @InjectRepository(PlaylistContentEntity) private readonly playlistContentRepo: Repository<PlaylistContentEntity>,
        @Inject(BucketService) private readonly bucketService: BucketService
    ) {}

    async createPlaylist(user: UserEntity, data: PlaylistRequestDto) {
        const playlist = await this.playlistRepo.save(new PlaylistEntity(user, data.name))
        return new PlaylistResponseDto(playlist)
    }

    async addContentInPlaylist(
        playlistId: string, 
        data: ContentRequestDto, 
        file: Express.Multer.File
    ): Promise<PlaylistResponseDto> {
        let playlist = await this.getPlaylistWithContent(playlistId)
        const content = await this.createContent(file)
        console.log(data)
        const newContent = new PlaylistContentEntity(content, playlist, data.duration, playlist.content.length)
        playlist.content.push(newContent)
        await this.playlistContentRepo.save(newContent)
        console.log(data)
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
        data: PlaylistContentRequestDto,
        file: Express.Multer.File
    ): Promise<PlaylistResponseDto> {
        const playlist = await this.getPlaylistWithContent(playlistId)
        let { content } = playlist;
        if (!content[contentOrder]) {
            throw new NotFoundException('content not found')
        }

        if (file) {
            content[contentOrder].content = await this.createContent(file)
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
                    movingContent[0].order = content.length
                } else {
                    movingContent[0].order = data.order
                }
                for (let index = contentOrder; index < movingContent[0].order; index++) {
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
        content = await this.playlistContentRepo.save(content)
        playlist.content = this.playlistContentSort(content)

        return new PlaylistResponseDto(playlist)
    
    }

    async deletePlaylist(id: string) {
        this.playlistRepo.delete(id)
    } 

    async deleteContentFromPlaylist(playlistId: string, contentOrder: number) {
        const playlist = await this.getPlaylistWithContent(playlistId)
        let { content } = playlist
        const isDataValid = playlist && content && content.length && content[contentOrder]
        if (!isDataValid) {
            throw new BadRequestException
        }

        const deletedContent = content[contentOrder].content
        await this.playlistContentRepo.delete(content[contentOrder])

        const isContentUsed = await this.playlistContentRepo.findOne({
            where: {
                contentId: deletedContent.id
            }
        }) != undefined

        if (!isContentUsed) {
            this.bucketService.delete(deletedContent, ContentEntity)
        }

        content.splice(contentOrder, 1)
        for (let index = contentOrder; index < content.length; index++) {
            content[index].order--;
        }
        content = await this.playlistContentRepo.save(content)
        playlist.content = content

        return new PlaylistResponseDto(playlist)
    }

    private async createContent(file: Express.Multer.File): Promise<ContentEntity> {
        const content = await this.bucketService.upload(file.buffer, file.originalname, ContentEntity) as ContentEntity
        if (content) {
            return content
        }
        throw new BadGatewayException('file is not uploaded to the bucket')
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
