import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { User } from './users.model';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesdGuard } from 'src/auth/roles.guard';

import { Roles } from 'src/auth/roles-auth.decorator';

import { AddRoleDto } from './dto/add-role-dto';
import { BanUserDto } from './dto/ban-user-dto';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Roles('USER', 'ADMIN')
  @UseGuards(RolesdGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Delete all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesdGuard)
  @Delete()
  deleteAllUsers() {
    return this.usersService.deleteAllUsers();
  }

  @ApiOperation({ summary: 'Delete user  by id' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesdGuard)
  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }

  @ApiOperation({ summary: 'Add role to User' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesdGuard)
  @Post('/role')
  addRoleToUser(@Body() dto: AddRoleDto) {
    return this.usersService.addRoleToUser(dto);
  }

  @ApiOperation({ summary: 'Ban User' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesdGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto);
  }
}
