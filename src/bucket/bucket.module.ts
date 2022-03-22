import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { BucketService } from './bucket.service';

@Module({
  providers: [BucketService],
  imports: [
    ConfigModule.forRoot({ envFilePath: ["s3.env"] })],
  exports: [BucketService]
})
export class BucketModule {}
