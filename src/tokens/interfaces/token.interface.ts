import { Document } from 'mongoose';

export interface TokensInterface extends Document {
  token: string;
}
