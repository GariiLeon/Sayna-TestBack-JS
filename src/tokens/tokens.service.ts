import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { REFRESH_TOKEN_MODEL_PROVIDER } from '../config/constants';
import { TokensInterface } from './interfaces/token.interface';

@Injectable()
export class TokensService {
  constructor(
    @Inject(REFRESH_TOKEN_MODEL_PROVIDER)
    private readonly refreshTokenModel: Model<TokensInterface>,
    @Inject(REFRESH_TOKEN_MODEL_PROVIDER)
    private readonly revokedTokenModel: Model<TokensInterface>,
  ) {}

  //REFRESH TOKEN
  async addRefreshToken(token) {
    return await new this.refreshTokenModel({ token: token }).save();
  }

  async deleteFromRefreshToken(token) {
    return await this.refreshTokenModel.findOneAndDelete({ token: token });
  }

  async checkIfRefreshTokenExist(token) {
    return await this.refreshTokenModel.findOne({ token: token });
  }

  //REVOKED TOKEN
  async addRevokedToken(token) {
    return await new this.revokedTokenModel({ token: token }).save();
  }

  async checkIfTokenRevoked(token) {
    return await this.revokedTokenModel.findOne({ token: token });
  }
}
