import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minLength: [3, 'Username must be at least 3 characters long'],
        maxLength: [20, 'Username must be at most 20 characters long']
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: [true, 'Email is already in use'],
    }
}, { timestamps: true });

export default mongoose.model('Users', UserSchema);