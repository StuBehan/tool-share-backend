import { Types, Model, Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  dateAdded: () => number;
}

interface UserMethods {
  isValidPassword(): boolean;
}

export type UserModel = Model<User, unknown, UserMethods>;

const userSchema = new Schema<User, UserModel>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
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
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre<User>('save', function (this: User, next): void {
  if (this.isModified('password')) return next();

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.method('isValidPassword', function (password: string) {
  return bcrypt.compareSync(password, this.password);
});

export const user = model<User, UserModel>('user', userSchema);
