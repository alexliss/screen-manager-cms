import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { PayloadDto } from "./payload.dto";
import { passportJwtSecret } from 'jwks-rsa';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(UserService) private readonly userService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKeyProvider: passportJwtSecret({
              cache: true,
              rateLimit: true,
              jwksRequestsPerMinute: 5,
              jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
            }),
            issuer: process.env.AUTH0_ISSUER_URL,
            audience: process.env.AUTH0_AUDIENCE,
            algorithms: ['RS256'],
        });
    }


    async validate(req: any) {
        const payloadData = new PayloadDto(req);
        if (!payloadData.id)
            throw new UnauthorizedException()
        const user = await this.userService.repo.findOne(payloadData.id)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user;
    }
}
