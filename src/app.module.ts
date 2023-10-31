import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest-course',
      models: [],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}
