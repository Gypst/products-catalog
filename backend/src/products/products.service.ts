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
    return this.prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        discountedPrice:
          productData.discountedPrice !== undefined && productData.discountedPrice !== ''
            ? parseFloat(productData.discountedPrice)
            : null,
        sku: productData.sku,
        imageUrl: productData.imageUrl || null,
      },
    });
  }

  async getById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
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
