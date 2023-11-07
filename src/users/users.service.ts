import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';

import { CreateUserDto } from './dto/create-user.dto';

import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleServices: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleServices.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async deleteAllUsers() {
    return ['Метод не имплементирован'];
  }

  async deleteUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) {
        throw new HttpException('Юзер не найден', HttpStatus.BAD_REQUEST);
      }
      await this.userRepository.destroy({ where: { id: id } });
      return user;
    } catch (error) {
      console.log('deleteUserById ~ error:', error);
      return new HttpException('Юзер не найден', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
