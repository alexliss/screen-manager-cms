import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginDtoRequest } from './dto/login.dto.request';
import { LoginDtoResponse } from './dto/login.dto.response';
import { RegisterDtoRequest } from './dto/register.dto.request';
import { EmailIsUsedException } from './exception/email-is-used.exception';
import { NameIsUsedException } from './exception/name-is-used.exception';
import { EmailUniqueGuard } from './guard/email-unique.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { NameUniqueGuard } from './guard/name-unique.guard';
import { PasswordHashingInterceptor } from './password-hashing.interceptor';
import { User } from './user.decorator';

@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @UseGuards(EmailUniqueGuard, NameUniqueGuard)
    @UseInterceptors(PasswordHashingInterceptor)
    @ApiException(() => [EmailIsUsedException, NameIsUsedException, BadRequestException])
    @ApiCreatedResponse({ type: LoginDtoResponse })
    async register(@Body() data: RegisterDtoRequest) {
        return this.authService.register(data);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDtoRequest })
    @ApiException(() => UnauthorizedException, { description: 'User is not authorized' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: LoginDtoResponse })
    async login(@User() user: UserEntity) {
        return this.authService.login(user);
    }
}
