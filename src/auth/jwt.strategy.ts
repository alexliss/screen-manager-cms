import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "src/config";
import { UserService } from "src/user/user.service";
import { PayloadDto } from "./dto/payload.dto";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(UserService) private readonly userService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET
        })
    }

    async validate(req: any) {
        const payloadData = new PayloadDto(req.payload.sub);

        if (!payloadData)
            throw new UnauthorizedException()
        const user = await this.userService.repo.findOne(payloadData.userId)
        if (!user) {
            throw new UnauthorizedException()
        }
        user.password = null//undefined
        return user;
    }
}
