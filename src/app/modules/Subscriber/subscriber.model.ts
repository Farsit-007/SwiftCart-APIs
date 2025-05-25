import { Schema, model } from 'mongoose';
import { ISubscriber } from './subscriber.interface';

const subscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: [true, 'You are already subscribed!'],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address!'],
    },
  },
  { timestamps: true, versionKey: false }
);

export const Subscriber = model<ISubscriber>('Subscriber', subscriberSchema);
