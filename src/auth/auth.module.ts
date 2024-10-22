// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule

@Module({
  imports: [
    PrismaModule, // Pastikan PrismaModule diimport
    JwtModule.register({
      secret: 'SECRET_KEY', // Ganti dengan kunci yang aman
      signOptions: { expiresIn: '1h' }, // Token kedaluwarsa dalam 60 detik
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
