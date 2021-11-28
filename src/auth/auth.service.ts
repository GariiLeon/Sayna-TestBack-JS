import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../config/config.env';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokensService: TokensService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '5d',
      secret: jwtConstants.secret_refresh_token,
    });
    this.tokensService.addRefreshToken(refresh_token);
    return {
      error: false,
      message: "L'utilisateur a été authentifié avec succès",
      tokens: {
        token: this.jwtService.sign(payload, { expiresIn: '10m' }),
        referesh_token: refresh_token,
        createdAt: Date.now(),
      },
    };
  }
}
