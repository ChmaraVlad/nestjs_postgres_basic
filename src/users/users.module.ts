import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersService } from './users.service';

import { UsersController } from './users.controller';

import { User } from './users.model';
import { UserRoles } from 'src/roles/user-role.model';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles]), RolesModule],
})
export class UsersModule {}
