import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { ScreenEntity } from './screen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ScreenService],
  controllers: [ScreenController],
  imports: [TypeOrmModule.forFeature([ScreenEntity])]
})
export class ScreenModule {}
