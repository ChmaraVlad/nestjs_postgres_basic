import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersService } from './users.service';

import { UsersController } from './users.controller';

import { User } from './users.model';
import { UserRoles } from 'src/roles/user-role.model';
import { Role } from 'src/roles/roles.model';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
})
export class UsersModule {}
