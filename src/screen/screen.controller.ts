import { BadRequestException, Controller, Get, NotFoundException, Param, ParseUUIDPipe, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserPropertyGuard } from 'src/user-property.guard';
import { ScreenRequestDto } from './dto/screen-request.dto';
import { ScreenResponseDto } from './dto/screen-response.dto';
import { ScreenResponseWithPlaylistDto } from './dto/screen-response-with-playlist.dto';
import { ScreenEntity } from './screen.entity';
import { ScreenService } from './screen.service';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

@ApiTags('screen')
@UseGuards(JwtAuthGuard)
@ApiException(() => [UnauthorizedException, BadRequestException, NotFoundException])
@ApiBearerAuth('user-token')
@Crud({
    model: {
        type: ScreenEntity
    },
    dto: {
        create: ScreenRequestDto,
        update: ScreenRequestDto
    },
    serialize: {
        create: ScreenResponseDto,
        update: ScreenResponseDto
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true
        }
    },
    routes: {
        exclude: ['replaceOneBase', 'recoverOneBase', 'createManyBase', 'getOneBase'],
        'updateOneBase': {
            decorators: [UseGuards(new UserPropertyGuard(ScreenEntity))]
        },
        'deleteOneBase': {
            decorators: [UseGuards(new UserPropertyGuard(ScreenEntity))]
        }
    }
})
@CrudAuth({
    property: 'user',
    persist: (user) => ({
        userId: user.id
    })
})
@Controller('screen')
export class ScreenController {
    constructor(public service: ScreenService) {}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ type: ScreenResponseWithPlaylistDto})
    @ApiException(() => [UnauthorizedException, BadRequestException, NotFoundException])
    async getScreen(@Param('id', ParseUUIDPipe) id: string) {
        return await this.service.getScreen(id)
    }
}
