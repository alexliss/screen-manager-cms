import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { UserPropertyGuard } from 'src/user-property.guard';
import { UserEntity } from 'src/user/user.entity';
import { ContentRequestDto } from './dto/content-request.dto';
import { PlaylistRequestDto } from './dto/playlist-request.dto';
import { ManyPlaylistsResponseDto } from './dto/many-playlists-response.dto';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { PlaylistContentService } from './playlist-content.service';
import { PlaylistEntity } from './playlist.entity';
import { PlaylistContentRequestDto } from './dto/playlist-content-request.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class PlaylistContentController {
    constructor(private readonly service: PlaylistContentService) {}

    @Post('playlist')
    async createPlaylist(
        @User() user: UserEntity,
        @Body() data: PlaylistRequestDto
    ): Promise<PlaylistResponseDto> {
        return await this.service.createPlaylist(user, data)
    }

    @UseGuards(new UserPropertyGuard(PlaylistEntity))
    @Post('playlist/:id')
    async addContentToPlaylist(
        @User() user: UserEntity,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() data: ContentRequestDto
    ): Promise<PlaylistResponseDto> {
        return await this.service.addContentInPlaylist(id, data)
    }

    @Get('playlist')
    async getUserPlaylists(@User() user: UserEntity): Promise<ManyPlaylistsResponseDto> {
        return await this.service.getAllUserPlaylists(user)
    }

    @Get('playlist/:id')
    async getPlaylistById(@Param('id', ParseUUIDPipe) id: string): Promise<PlaylistResponseDto> {
        return await this.service.getPlaylistById(id)
    }

    @UseGuards(new UserPropertyGuard(PlaylistEntity))
    @Patch('playlist/:id')
    async changePlaylist(
        @User() user: UserEntity, 
        @Param('id', ParseUUIDPipe) id: string,
        @Body() data: PlaylistRequestDto
    ): Promise<PlaylistResponseDto> {
        return await this.service.changePlaylistName(id, data)
    }

    /*@UseGuards(new UserPropertyGuard(PlaylistEntity))
    @Patch('playlist/:id/:contentOrder')
    async changeContentInPlaylist(
        @Param('id', ParseUUIDPipe) playlistId: string,
        @Param('contentOrder', ParseIntPipe) contentOrder: number,
        @Body() data: PlaylistContentRequestDto
    ): Promise<PlaylistResponseDto> {
        return await this.service.changeContentInPlaylist(playlistId, contentOrder, data)
    }*/

    @UseGuards(new UserPropertyGuard(PlaylistEntity)) 
    @Delete('playlist/:id')
    async deletePlaylist(@Param('id', ParseUUIDPipe) id: string) {
        await this.deletePlaylist(id)
    }

    @UseGuards(new UserPropertyGuard(PlaylistEntity))
    @Delete('playlist/:id/:contentOrder')
    async deleteContentFromPlaylist(
        @Param('id', ParseUUIDPipe) playlistId: string,
        @Param('contentOrder') contentOrder: number
    ) {
        await this.service.deleteContentFromPlaylist(playlistId, contentOrder)
    }
    
}
