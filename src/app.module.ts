import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { EventModule } from './event/event.module';
import { ScreenModule } from './screen/screen.module';
import { PlaylistContentModule } from './playlist-content/playlist-content.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    AuthModule,
    EventModule,
    ScreenModule,
    PlaylistContentModule],
})
export class AppModule { }
