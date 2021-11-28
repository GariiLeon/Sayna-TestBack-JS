import * as mongoose from 'mongoose';
import { DB_PROVIDER } from '../config/constants';

export const databaseProviders = [
  {
    provide: DB_PROVIDER,
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;
      try {
        const db = await mongoose.createConnection(
          // 'mongodb://localhost:27017/sayna',
          `mongodb://garii:TNVBeHvts6uq4C80@cluster0-shard-00-00.swd3j.mongodb.net:27017,cluster0-shard-00-01.swd3j.mongodb.net:27017,cluster0-shard-00-02.swd3j.mongodb.net:27017/saynaTest?ssl=true&replicaSet=atlas-j0bk2d-shard-0&authSource=admin&retryWrites=true&w=majority`,
        );
        console.log('Database connected');
        return db;
      } catch (e) {
        console.log('Database not connected' + e.message);
        throw e;
      }
    },
    Inject: [],
  },
];
