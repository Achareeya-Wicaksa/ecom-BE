// src/auth/jwt.strategy.ts
import { Injectable,UnauthorizedException  } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload); // Tambahkan ini untuk debugging

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
        console.log('User not found!'); // Log jika user tidak ditemukan

      throw new UnauthorizedException();
    }

    return { userId: user.id, email: user.email, role: user.role };
  }
}
