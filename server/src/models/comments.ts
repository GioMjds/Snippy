import mongoose, { Schema } from "mongoose";

interface IComment {
    [x: string]: any;
    authorId: Schema.Types.ObjectId;
    snippetId: Schema.Types.ObjectId;
    text: string;
    creationDate?: Date;
    updatedDate?: Date;
    parentCommentId?: Schema.Types.ObjectId;
}

const CommentSchema = new Schema({
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
        ref: 'Comment',
    },
});

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);

// Comment abstract functions
export const fetchAllComments = () => Comment.find();
export const fetchCommentsBySnippetId = (snippetId: string) => Comment.find({ snippetId });
export const fetchCommentsByParentCommentId = (parentCommentId: string) => Comment.find({ parentCommentId });
export const postComment = (values: Record<string, any>) => new Comment(values).save().then((comment) => comment.toObject());
export const replyComment = (values: Record<string, any>) => new Comment(values).save().then((comment) => comment.toObject());
export const updateComment = (id: string, values: Record<string, any>) => Comment.findByIdAndUpdate(id, values, { new: true });
export const deleteComment = (id: string) => Comment.findByIdAndDelete({ _id: id });