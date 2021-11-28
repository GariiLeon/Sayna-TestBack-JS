import * as mongoose from 'mongoose';

export const RevokedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});
