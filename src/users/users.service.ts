import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';

import { User } from './users.model';

import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role-dto';
import { BanUserDto } from './dto/ban-user-dto';

import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleServices: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);

    const updatedDto = { ...dto, password: hashPassword };

    const user = await this.userRepository.create(updatedDto);
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
  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (user) {
      user.banned = true;
      user.banReason = dto.banReason;
      await user.save();
      return user;
    }
    throw new HttpException('Пользователь не найдено', HttpStatus.NOT_FOUND);
  }

  async addRoleToUser(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    const role = await this.roleServices.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return user;
    }
    throw new HttpException(
      'Пользователь или роль не найдено',
      HttpStatus.NOT_FOUND,
    );
  }
}
