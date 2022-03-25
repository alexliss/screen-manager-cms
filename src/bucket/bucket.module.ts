import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BucketService } from './bucket.service';

@Module({
  providers: [BucketService],
  imports: [
    ConfigModule.forRoot({ envFilePath: ["s3.env"] })],
  exports: [BucketService]
})
export class BucketModule {}
