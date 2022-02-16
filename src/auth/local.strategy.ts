import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserEntity } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import * as argon2 from "argon2";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(UserService) private readonly userService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<UserEntity> {
        const user = await this.userService.repo.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new UnauthorizedException()
        }
        const isPasswordCorrect = await argon2.verify(user.password, password)
        if (!isPasswordCorrect) {
            throw new UnauthorizedException()
        }
        return user;
    }
}
