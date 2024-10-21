// src/user/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() body: { name: string; email: string; password: string }) {
    return this.userService.signUp(body.name, body.email, body.password);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    // Pastikan email dan password terdefinisi
    console.log('Login DTO:', loginDto);
    return this.userService.login(loginDto.email, loginDto.password);
  }
}
