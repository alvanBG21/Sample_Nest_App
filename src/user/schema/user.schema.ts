import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  first_name: string;

  @Prop({
    required: true,
    trim: true,
  })
  last_name: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id;
});

UserSchema.virtual('user_id').get(function () {
  return this._id;
});

// UserSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj._id;
//   delete obj.__v;
// };
