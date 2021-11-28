import { Connection } from 'mongoose';

import { UsersSchema } from './schemas/users.schema';
import { USERS_MODEL_PROVIDER, DB_PROVIDER } from '../config/constants';

export const UsersProviders = [
  {
    provide: USERS_MODEL_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model('users', UsersSchema),
    inject: [DB_PROVIDER],
  },
];
