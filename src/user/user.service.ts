import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findByRecoverToken(recoverToken: string) {
    return this.prisma.user.findUnique({ where: { recoverToken } });
  }

  async updateUserPassword(userId: number, newPassword: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });
    return user;
  }

  async createRecoverToken(email: string, recoverToken: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user)
      throw new NotFoundException(
        'There is no user registered with this email.',
      );

    const userWithToken = await this.prisma.user.update({
      where: { email },
      data: { recoverToken },
    });

    return userWithToken;
  }

  async resetPassword(
    recoverToken: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { password } = changePasswordDto;

    const user = await this.findByRecoverToken(recoverToken);

    if (!user) throw new NotFoundException('Token inválido.');

    const data = {
      password: await bcrypt.hash(password, 10),
      recoverToken: null,
    };

    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }
}
