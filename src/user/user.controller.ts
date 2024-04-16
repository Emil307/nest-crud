import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Post()
  async createUser(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  async changeEmail(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.change(id, dto);
  } 

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
