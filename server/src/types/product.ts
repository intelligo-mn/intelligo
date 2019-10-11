import { Document } from 'mongoose';

import { User } from './user';

export interface Product extends Document {
  owner: User;
  title: string;
  image: string;
  description: string;
  price: number;
  created: Date;
}
