import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(page: number, limit: number, filter: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { name: { contains: filter } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(productData: any): Promise<Product> {
    return this.prisma.product.create({ data: productData });
  }

  async update(id: number, productData: any): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: productData,
    });
  }

  async delete(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
