import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TokensProviders } from './tokens.provider';
import { TokensService } from './tokens.service';

@Module({
  imports: [DatabaseModule],
  providers: [TokensService, ...TokensProviders],
  exports: [TokensService],
})
export class TokensModule {}
