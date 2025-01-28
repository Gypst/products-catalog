import { Module, OnModuleInit } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  controllers: [UploadsController],
})
export class UploadsModule implements OnModuleInit {
  onModuleInit() {
    const uploadDir = path.resolve('./uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  }
}