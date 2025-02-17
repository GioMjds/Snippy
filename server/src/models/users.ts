import mongoose, { Schema } from 'mongoose';

export interface IUser {
    [x: string]: any;
    username: string;
    email: string;
    authentication?: {
        salt: string;
        password: string;
        sessionToken?: string;
    }
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
    authentication: {
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
            minLength: [8, 'Password must be at least 8 characters long']
        },
        salt: {
            type: String,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false,
        },
    },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);

// Model abstract functions

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
export const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values, { new: true });
export const deleteUserById = (id: string) => User.findByIdAndDelete({ _id: id });