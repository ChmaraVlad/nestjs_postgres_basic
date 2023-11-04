import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/createRoleDto';

@Controller('roles')
export class RolesController {
  constructor(private roleServices: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleServices.createRole(dto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleServices.getRoleByValue(value);
  }

  @Get('')
  getAll() {
    return this.roleServices.getAllRoles();
  }
}
