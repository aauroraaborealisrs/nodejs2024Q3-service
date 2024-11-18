import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ValidationPipe,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { validate as isUUID } from 'uuid';
import { CreateUserDto, UpdatePasswordDto } from 'src/users/dto';

@Controller('user')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId format');
    }

    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  public async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put(':id')
  @HttpCode(200)
  public async updateUserPassword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId format');
    }

    return this.userService.updateUserPassword(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteUser(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId format');
    }

    return this.userService.deleteUser(id);
  }
}
