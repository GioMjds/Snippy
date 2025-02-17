import mongoose, { Schema } from "mongoose";

interface ISnippet {
    [x: string]: any;
    authorId: Schema.Types.ObjectId;
    title: string;
    description?: string;
    code?: string;
    tags?: string[];
    creationDate?: Date;
    updatedDate?: Date;
    upvoteCount?: number;
    downvoteCount?: number;
    commentCount?: number;
}

const SnippetSchema = new Schema({
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
    },
    code: {
        type: String,
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
    upvoteCount: { type: Number, default: 0 },
    downvoteCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
});

export const Snippets = mongoose.model<ISnippet>('Snippet', SnippetSchema);

// Snippet abstract functions

export const fetchAllSnippets = () => Snippets.find();
export const viewSnippetPost = (id: string) => Snippets.findById(id);
export const createSnippetPost = (values: Record<string, any>) => new Snippets(values).save().then((snippet) => snippet.toObject());
export const updateSnippetPost = (id: string, values: Record<string, any>) => Snippets.findByIdAndUpdate(id, values, { new: true });
export const deleteSnippetPost = (id: string) => Snippets.findByIdAndDelete({ _id: id });
export const shareSnippetPost = (id: string) => Snippets.findById(id).select('+authorId').populate('authorId', 'username email');