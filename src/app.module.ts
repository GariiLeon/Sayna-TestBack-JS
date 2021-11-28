import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TokensModule } from './tokens/tokens.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/config.env';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    TokensModule,
    JwtModule.register({
      secret: jwtConstants.secret_access_token,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
