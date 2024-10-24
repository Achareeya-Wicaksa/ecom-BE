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
    console.log('Parameters:', { userId, productId, productQuantity }); // Tambahkan log
  
    if (!userId) {
      throw new Error('User ID is required to add a product to the cart.');
    }
  
    // Cek apakah item produk sudah ada dalam cart
    const existingCartItem = await this.prisma.cart.findUnique({
      where: { userId_productId: { userId: userId, productId: productId } },
    });
  
    if (existingCartItem) {
      // Jika item produk sudah ada dalam cart, perbarui quantity
      const updatedCartItem = await this.prisma.cart.update({
        where: { id: existingCartItem.id },
        data: {
          productQuantity: existingCartItem.productQuantity + productQuantity, // Tambah quantity
        },
      });
      return updatedCartItem;
    } else {
      // Jika item produk belum ada dalam cart, buat cart baru
      const cartItem = await this.prisma.cart.create({
        data: {
          userId: userId,
          productId: productId,
          productQuantity: productQuantity,
        },
      });
      return cartItem;
    }
  }
  

  async getCartByUser(userId: number) {
    // Mengambil cart berdasarkan userId
    return this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
  }
}
