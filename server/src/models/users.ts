import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username?: string;
    email?: string;
    password?: string;
    googleId?: string;
    githubId?: string;
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minLength: [3, 'Username must be at least 3 characters long'],
        maxLength: [20, 'Username must be at most 20 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: [true, 'Email is already in use'],
    },
    password: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true
    }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);