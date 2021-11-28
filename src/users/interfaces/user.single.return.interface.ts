import { Document } from 'mongoose';

export interface SingleUserInterface extends Document {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly date_naissance: string;
  readonly sexe: string;
  readonly createdAt: Date;
}
