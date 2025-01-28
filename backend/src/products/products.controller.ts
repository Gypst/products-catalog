import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('filter') filter = ''
  ) {
    return this.productsService.getAll(page, limit, filter);
  }

  @Post()
  async createProduct(@Body() productData: any) {
    return this.productsService.create(productData);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() productData: any) {
    return this.productsService.update(id, productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
