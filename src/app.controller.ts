import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  Request,
  HttpStatus,
  HttpException,
  Delete,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { Public } from './auth/auth.decorator';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { jwtConstants } from './config/config.env';
import { TokensService } from './tokens/tokens.service';
import { CreateUserDto } from './users/dtos/users.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private usersService: UsersService,
    private authService: AuthService,
    private tokensService: TokensService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getAllUser(@Res() res) {
    try {
      const users = await this.usersService.getAllUsers();
      return res.status(200).json({
        error: false,
        users,
      });
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          message: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('logout')
  async logout(@Request() req, @Res() res, @Body() data) {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    const refresh_token = data.token;
    await this.tokensService.addRevokedToken(token);
    await this.tokensService.deleteFromRefreshToken(refresh_token);
    return res.status(200).json({
      error: false,
      message: "L'utilisateur a été deconnecté avec succès",
    });
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Request() req, @Res() res, @Body() data) {
    try {
      const refresh_token = data.token;
      if (!refresh_token) {
        return res.status(403).json({
          error: true,
          message: 'Le refresh token est manquant',
        });
      } else {
        const auth = req.headers.authorization;
        const old_access_token = auth.split(' ')[1];
        await this.tokensService.addRevokedToken(old_access_token);
        const token_doc = await this.tokensService.checkIfRefreshTokenExist(
          refresh_token,
        );

        if (!token_doc) {
          return res.status(401).json({
            error: true,
            message:
              "Votre refresh token n'est plus valide, veuillez le réinitialiser",
          });
        } else {
          const payload = await this.jwtService.verify(token_doc.token, {
            secret: jwtConstants.secret_refresh_token,
          });
          const accessToken = this.jwtService.sign(
            { username: payload.username, sub: payload.sub },
            {
              expiresIn: '10m',
            },
          );
          return res.status(200).json({
            error: false,
            message: 'Le token a été rafraichi',
            tokens: {
              token: accessToken,
              referesh_token: token_doc.token,
              createdAt: Date.now(),
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: 'Internal Server Error!',
      });
    }
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async registerUser(@Res() res, @Body() userData: CreateUserDto) {
    try {
      const user = await this.usersService.addUser(userData);
      if (user) {
        return res.status(200).json({
          error: false,
          message: "L'utilisateur a été créé",
          user,
        });
      }
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
