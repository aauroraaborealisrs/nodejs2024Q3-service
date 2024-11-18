import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User } from 'src/db/entities';
import { CreateUserDto, UpdatePasswordDto } from 'src/users/dto';

@Injectable()
export class UserService {
  public async getAllUsers(): Promise<User[]> {
    return User.find();
  }

  public async getUserById(id: string): Promise<User> {
    const user = await User.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToClass(User, user);
  }

  public async createUser(dto: CreateUserDto): Promise<User> {
    const currentTime = Date.now();
    const user = await User.save({
      ...dto,
      createdAt: currentTime,
      updatedAt: currentTime,
    });

    return plainToClass(User, user);
  }

  public async updateUserPassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }

    const updatedUser = await User.save({
      ...user,
      password: dto.newPassword,
      version: (user.version += 1),
      updatedAt: Date.now(),
    });

    return plainToClass(User, updatedUser);
  }

  public async deleteUser(id: string): Promise<boolean> {
    const user = await this.getUserById(id);

    await User.delete({ id: user.id });

    return true;
  }
}
