import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './event/event.module';
import { ScreenModule } from './screen/screen.module';
import { PlaylistContentModule } from './playlist-content/playlist-content.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    EventModule,
    ScreenModule,
    PlaylistContentModule],
})
export class AppModule { }
