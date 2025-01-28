import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [PrismaModule, ProductsModule, UploadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
