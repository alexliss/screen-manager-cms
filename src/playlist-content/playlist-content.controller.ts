import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { UserPropertyGuard } from 'src/user-property.guard';
import { UserEntity } from 'src/user/user.entity';
import { ContentRequestDto } from './dto/content-request.dto';
import { PlaylistRequestDto } from './dto/playlist-request.dto';
import { ManyPlaylistsResponseDto } from './dto/many-playlists-response.dto';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { PlaylistContentService } from './playlist-content.service';
import { PlaylistEntity } from './entity/playlist.entity';
import { PlaylistContentRequestDto } from './dto/playlist-content-request.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

@ApiTags('playlist-content')
@ApiBearerAuth('user-token')
@Controller()
@UseGuards(JwtAuthGuard)
export class PlaylistContentController {
    constructor(private readonly service: PlaylistContentService) {}

    @Post('playlist')
    @ApiException(() => [UnauthorizedException, BadRequestException, NotFoundException])
    @ApiOkResponse({type: PlaylistResponseDto})
    async createPlaylist(
        @User() user: UserEntity,
        @Body() data: PlaylistRequestDto
    ): Promise<PlaylistResponseDto> {
        return await this.service.createPlaylist(user, data)
    }

    @UseGuards(new UserPropertyGuard(PlaylistEntity))
    @Post('playlist/:id')
    @ApiException(() => [UnauthorizedException, BadRequestException, NotFoundException])
    @ApiOkResponse({type: PlaylistResponseDto})
    async addContentToPlaylist(
        @User() user: UserEntity,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() data: ContentRequestDto
    ): Promise<PlaylistResponseDto> {
        return await this.service.addContentInPlaylist(id, data)
    }

    @Get('playlist')
    @ApiException(() => [UnauthorizedException, BadRequestException, NotFoundException])
    @ApiOkResponse({type: ManyPlaylistsResponseDto})
    async getUserPlaylists(@User() user: UserEntity): Promise<ManyPlaylistsResponseDto> {
        return await this.service.getAllUserPlaylists(user)
    }

    @Get('playlist/:id')
    @ApiException(() => [UnauthorizedException, BadRequestException, NotFoundException])
    @ApiOkResponse({type: PlaylistResponseDto})
    async getPlaylistById(@Param('id', ParseUUIDPipe) id: string): Promise<PlaylistResponseDto> {
        return await this.service.getPlaylistById(id)
    }

    @UseGuards(new UserPropertyGuard(PlaylistEntity))
    @ApiException(() => [UnauthorizedException, BadRequestException, NotFoundException])
    @ApiOkResponse({type: PlaylistResponseDto})
    @Patch('playlist/:id')
    async changePlaylist(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() data: PlaylistRequestDto
    ): Promise<PlaylistResponseDto> {
        return await this.service.changePlaylistName(id, data)
    }

    @UseGuards(new UserPropertyGuard(PlaylistEntity))
    @ApiException(() => [UnauthorizedException, BadRequestException, NotFoundException])
    @ApiOkResponse({type: PlaylistResponseDto})
    @Patch('playlist/:id/:contentOrder')
    async changeContentInPlaylist(
        @Param('id', ParseUUIDPipe) playlistId: string,
        @Param('contentOrder', ParseIntPipe) contentOrder: number,
        @Body() data: PlaylistContentRequestDto
    ): Promise<PlaylistResponseDto> {
        return await this.service.changeContentInPlaylist(playlistId, contentOrder, data)
    }

    @UseGuards(new UserPropertyGuard(PlaylistEntity))
    @ApiException(() => [UnauthorizedException, BadRequestException, NotFoundException]) 
    @Delete('playlist/:id')
    async deletePlaylist(@Param('id', ParseUUIDPipe) id: string) {
        await this.service.deletePlaylist(id)
    }

    @UseGuards(new UserPropertyGuard(PlaylistEntity))
    @ApiException(() => [UnauthorizedException, BadRequestException, NotFoundException])
    @Delete('playlist/:id/:contentOrder')
    async deleteContentFromPlaylist(
        @Param('id', ParseUUIDPipe) playlistId: string,
        @Param('contentOrder') contentOrder: number
    ): Promise<PlaylistResponseDto> {
        return await this.service.deleteContentFromPlaylist(playlistId, contentOrder)
    }
    
}
