// src/app.module.ts
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    AuthModule,
    UserModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // Ganti dengan secret yang lebih aman
      signOptions: { expiresIn: '60s' }, // Sesuaikan waktu kedaluwarsa token
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
