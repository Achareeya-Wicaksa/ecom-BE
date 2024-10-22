// src/app.module.ts
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    AuthModule,
    UserModule,
    CartModule,
    JwtModule.register({
      secret: 'secret', 
      signOptions: { expiresIn: '1h' }, 
    }),
    CartModule,
  ],
  controllers: [UserController, CartController],
  providers: [UserService, CartService],
})
export class AppModule {}
