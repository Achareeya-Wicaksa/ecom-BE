// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET_KEY', // Ganti dengan kunci yang aman
      signOptions: { expiresIn: '60s' }, // Token akan kedaluwarsa dalam 60 detik
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
