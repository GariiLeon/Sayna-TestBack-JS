import { Document } from 'mongoose';

export interface UsersReturnInterface extends Document {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly sexe: string;
}
