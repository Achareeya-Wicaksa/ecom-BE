// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule

@Module({
  imports: [PrismaModule], // Pastikan PrismaModule di-import
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
