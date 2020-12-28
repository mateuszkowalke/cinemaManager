import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    kind: 'iuser';
    username: string;
    password: string;
    date: Date;
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        min: 8,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

export const User: Model<IUser> = model<IUser>('User', userSchema);