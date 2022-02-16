import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParsedRequest } from '@nestjsx/crud';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginDtoRequest } from './dto/login.dto.request';
import { LoginDtoResponse } from './dto/login.dto.response';
import { RegisterDtoRequest } from './dto/register.dto.request';
import { EmailUniqueGuard } from './guard/email-unique.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { NameUniqueGuard } from './guard/name-unique.guard';
import { User } from './user.decorator';

@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @UseGuards(EmailUniqueGuard, NameUniqueGuard)
    @ApiCreatedResponse({ type: LoginDtoResponse })
    async register(@Body() data: RegisterDtoRequest) {
        return this.authService.register(data);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDtoRequest })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: LoginDtoResponse })
    async login(@User() user: UserEntity) {
        return this.authService.login(user);
    }
}
