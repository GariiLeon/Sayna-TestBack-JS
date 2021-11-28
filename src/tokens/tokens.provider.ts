import { Connection } from 'mongoose';

import {
  REFRESH_TOKEN_MODEL_PROVIDER,
  REVOKED_TOKEN_MODEL_PROVIDER,
  DB_PROVIDER,
} from '../config/constants';
import { RefreshTokenSchema } from './schemas/refresh.token.schema';
import { RevokedTokenSchema } from './schemas/revoked.token.schema';

export const TokensProviders = [
  {
    provide: REFRESH_TOKEN_MODEL_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model('refresh_tokens', RefreshTokenSchema),
    inject: [DB_PROVIDER],
  },
  {
    provide: REVOKED_TOKEN_MODEL_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model('revoked_tokens', RevokedTokenSchema),
    inject: [DB_PROVIDER],
  },
];
