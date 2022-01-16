import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { UploadImage } from './upload.entity';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadImage)
    private uploadRepository: Repository<UploadImage>,
  ) {}

  async uploadImage(dataBuffer: Buffer, filename: string) {
    const s3 = new AWS.S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
        ContentType: 'image/*',
      })
      .promise();

    const newFile = this.uploadRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.uploadRepository.save(newFile);
    return newFile;
  }

  async deleteImage(fileId: number) {
    const file = await this.uploadRepository.findOne({ id: fileId });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: file.key,
      })
      .promise();
    await this.uploadRepository.delete(fileId);
  }
}
