import * as mongoose from 'mongoose';

export const RefreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});
