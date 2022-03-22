import { Injectable, Type } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { getRepository } from 'typeorm';
import { BucketFile } from './bucket-file';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BucketService {
    private s3: S3
    
    constructor() {
        this.s3 = new S3({
            endpoint: process.env.S3_ENDPOINT,
            accessKeyId: process.env.S3_ACCESS_KEY, 
            secretAccessKey: process.env.S3_SECRET_KEY,
            region: process.env.S3_REGION,
            httpOptions: {
                timeout: 10000,
                connectTimeout: 10000
            },
        })
    }
    
    async upload(dataBuffer: Buffer, filename: string, type: Type<BucketFile>): Promise<BucketFile> {
        const uploadResult = await this.s3.upload({
            Bucket: process.env.S3_BUCKET,
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`
        }).promise();
       
        const newFile = getRepository(type).create({
            id: uploadResult.Key.slice(0, 36),
            link: uploadResult.Location,
            key: uploadResult.Key
        });
        await getRepository(type).save(newFile);
        return newFile;
    }

    async delete(file: BucketFile, type: Type<BucketFile>) {
        await this.s3.deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key: file.key
        }).promise()
        console.log(type)
        await getRepository(type).delete(file.id)
    }
}
