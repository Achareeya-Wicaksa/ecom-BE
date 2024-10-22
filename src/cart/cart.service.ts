// src/cart/cart.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async addToCart(userId: number, productId: number, productQuantity: number) {
    // Tambahkan product ke dalam cart user
    const cartItem = await this.prisma.cart.create({
      data: {
        userId,
        productId,
        productQuantity,
      },
    });
    return cartItem;
  }

  async getCartByUser(userId: number) {
    // Mengambil cart berdasarkan userId
    return this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
  }
}
