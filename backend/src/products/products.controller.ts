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

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() productData: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.create({
      ...productData,
      imageUrl: file?.path || null,
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
