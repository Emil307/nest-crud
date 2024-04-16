import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor (private prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: +id
      }
    });

    if (!user) throw new NotFoundException('user not found!')

    return user
  }

  async getOne(id: string) {
    return await this.getById(id);
  }

  getAll() {
    return this.prisma.user.findMany()
  }

  create(dto: UserDto) {
    return this.prisma.user.create({
      data: dto
    })
  }

  async change(id: string, dto: UserDto) {
    const user = await this.getById(id);

    return this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        email: dto.email
      }
    })
  }

  async delete(id: string) {
    const user = await this.getById(id);

    return this.prisma.user.delete({
      where: {
        id: user.id
      }
    })
  }
}
