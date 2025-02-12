import mongoose, { Schema } from "mongoose";

const VoteSchema = new Schema({
    _id: Schema.Types.ObjectId,
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

export default mongoose.model('Votes', VoteSchema);