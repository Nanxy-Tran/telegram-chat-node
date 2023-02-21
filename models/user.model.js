import mongoose from "mongoose";

const schema = new mongoose.Schema({
    telegramId: String,
    username: String
});

const User = mongoose.model('User', schema);

export default User;