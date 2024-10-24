// src/cart/cart.controller.ts
import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addToCart(@Request() req, @Body() body) {
    console.log('User ID from Token:', req.user); // Log user dari token
    const { productId, productQuantity } = body;
    return this.cartService.addToCart(req.user.id, productId, productQuantity);
  }

  
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getCart(@Request() req) {
    console.log('User ID from JWT:', req.user.id); // Cek ID user dari JWT
    return this.cartService.getCartByUser(req.user.id);
  }
  
  
  
}
