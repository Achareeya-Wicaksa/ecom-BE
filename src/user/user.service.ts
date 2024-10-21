// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Register user
  async signUp(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user', // Default role
      },
    });
    return user;
  }


  // Validate user credentials
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Login user and generate JWT token
  async login(email: string, password: string) {
    // Temukan user berdasarkan email
    const user = await this.prisma.user.findUnique({
      where: { email }, // Pastikan email terdefinisi di sini
    });

    // Periksa apakah user ditemukan
    if (!user) {
      throw new Error('User not found');
    }

    // Bandingkan password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Jika valid, buat JWT token
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token };
  }
}
