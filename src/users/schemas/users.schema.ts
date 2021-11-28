import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date_naissance: {
      type: String,
      required: true,
    },
    sexe: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);
