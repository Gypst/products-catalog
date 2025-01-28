import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { diskStorage } from 'multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('filter') filter = '',
  ) {
    return this.productsService.getAll(+page, +limit, filter);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.getById(+id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    })
  )
  async createProduct(
    @Body() productData: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = file ? `/uploads/${file.filename}` : null;

    return this.productsService.create({
      ...productData,
      imageUrl,
    });
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: UpdateProductDto,
  ) {
    return this.productsService.update(+id, productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }
}
