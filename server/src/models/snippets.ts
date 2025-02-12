import mongoose, { Schema } from "mongoose";

const SnippetSchema = new Schema({
    _id: Schema.Types.ObjectId,
    authorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxLength: [100, 'Title must be at most 100 characters long'],
        minLength: [3, 'Title must be at least 3 characters long']
    },
    description: {
        type: String,
        maxLength: [500, 'Description must be at most 500 characters long'],
    },
    code: {
        type: String,
        required: [true, 'Code is required'],
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    creationDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    license: {
        type: String,
        maxLength: [100, 'License must be at most 100 characters long'],
    },
    upvoteCount: { type: Number, default: 0 },
    downvoteCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
});

export default mongoose.model('Snippets', SnippetSchema);