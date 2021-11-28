import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { UsersProviders } from './users.provider';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [UsersService, ...UsersProviders],
  exports: [UsersService],
})
export class UsersModule {}
