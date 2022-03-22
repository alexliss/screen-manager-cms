import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { NoExistenceCheckJwtStrategy } from './no-existence-check-jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [JwtStrategy, NoExistenceCheckJwtStrategy],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["auth.env"]
    }),
    UserModule,
    PassportModule
    ]
})
export class AuthModule { }
