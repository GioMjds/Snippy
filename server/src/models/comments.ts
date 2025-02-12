import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    _id: Schema.Types.ObjectId,
    authorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
    },
    snippetId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Snippets',
    },
    text: {
        type: String,
        required: true,
        minLength: 1,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    },
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comments',
    },
});

export default mongoose.model('Comments', CommentSchema);