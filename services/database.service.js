import mongoose from 'mongoose';
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

class DbService {
    connection;
    async connect() {
        mongoose.set('strictQuery', true);
        this.connection = await mongoose.connect(process.env.DATABASE_URI);
        console.log('DB connected');
    }
    async getUserByTelegramId(telegramId, username = null) {
        let user = await User.findOne({
            telegramId,
        });

        if (!user && username !== null) {
            user = await User.create({
                telegramId,
                username
            });
        }

        return user;
    }

    async getUserMessages(userId) {
        return Message.find({
            user: userId
        });
    }

    async createNewMessage(user, userMessage, botMessage) {
        return Message.create({
            user: user._id,
            userMessage,
            botMessage,
        })
    }

    async clearUserMessages(userId) {
        return Message.deleteMany({
            user: userId
        });
    }
}

export default new DbService();