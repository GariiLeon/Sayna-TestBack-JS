import { Document } from 'mongoose';

export interface UsersInterface extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  date_naissance: string;
  sexe: string;
  createdAt: Date;
}
