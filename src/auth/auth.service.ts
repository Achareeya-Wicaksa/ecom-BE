import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    
    // Pastikan secret yang sama digunakan di sini
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET, // Tambahkan secret di sini
      }),
    };
  }
}
