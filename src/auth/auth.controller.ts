import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { UserService } from 'src/user/user.service';
import { PayloadDto } from './payload.dto';
import { User } from './user.decorator';

@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private readonly userService: UserService) { }

    @ApiBearerAuth('user-token')
    @Post('auth')
    @UseGuards(AuthGuard('jwt-no-check'))
    @ApiException(() => UnauthorizedException, { description: 'User is not authorized' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: UserResponseDto })
    async login(@User() data: PayloadDto) {
        return await this.userService.createOrFind(data)
    }
}
