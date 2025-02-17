import mongoose, { Schema } from "mongoose";

interface IVote {
    [x: string]: any;
    userId: Schema.Types.ObjectId;
    snippetId: Schema.Types.ObjectId;
    voteType: string;
    voteValue: number;
    voteDate?: Date;
}

const VoteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
    },
    snippetId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Snippets',
    },
    voteType: {
        type: String,
        required: true,
        enum: ['upvote', 'downvote'],
        voteValue: {
            type: Number,
            enum: [1, -1],
        }
    },
    voteDate: {
        type: Date,
        default: Date.now,
    }
});

export const Votes = mongoose.model<IVote>('Votes', VoteSchema);

// Vote abstract functions

export const fetchAllVotes = () => Votes.find();
export const fetchVotesBySnippetId = (snippetId: string) => Votes.find({ snippetId });
export const upvoteSnippet = (userId: string, snippetId: string) => new Votes({ userId, snippetId, voteType: 'upvote', voteValue: 1 }).save().then((vote) => vote.toObject());
export const downvoteSnippet = (userId: string, snippetId: string) => new Votes({ userId, snippetId, voteType: 'downvote', voteValue: -1 }).save().then((vote) => vote.toObject());