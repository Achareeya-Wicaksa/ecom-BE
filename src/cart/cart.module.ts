// src/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [CartController],
  providers: [CartService, JwtStrategy],
})
export class CartModule {}
