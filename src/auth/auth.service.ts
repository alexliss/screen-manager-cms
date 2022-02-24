import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDtoRequest } from './dto/register.dto.request';
import { UserEntity } from 'src/user/user.entity';
import { LoginDtoResponse } from './dto/login.dto.response';
import { PayloadDto } from './dto/payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService) { }

    async register(data: RegisterDtoRequest) {
        const user = await this.userService.register(data)
        return new LoginDtoResponse(this.createToken(user))
    }

    login(user: UserEntity) {
        return new LoginDtoResponse(this.createToken(user))
    }

    private createToken(user: UserEntity): string {
        const payload = new PayloadDto(user.id);
        console.log(payload)
        return this.jwtService.sign( { payload } )
    }
}
