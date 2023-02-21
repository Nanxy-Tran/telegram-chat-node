import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    botMessage: String,
    userMessage: String,
});

const Message = mongoose.model('Message', schema);

export default Message