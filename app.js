import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import gptService from "./services/gpt.service.js";
import databaseService from "./services/database.service.js";

dotenv.config();

const telegramToken = process.env.TELEGRAM_BOT_KEY;

const bot = new TelegramBot(telegramToken, {polling: true});
const welcomeMsg = (name = 'bạn') => `Chào mừng ${name}, tôi là bot của Nanxy, hãy hỏi tôi bằng tiếng anh, vì Nanxy không có đủ $ để trả tiền cho davinci model (loại model giúp tôi trả lời trong nhiều thứ tiếng)`

databaseService.connect().then(() => {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const chatMsg = msg.text;

        const chatAuthor = await databaseService.getUserByTelegramId(msg.from.id, `${msg.from.first_name} ${msg.from.last_name}`)

        if (msg.entities?.[0]?.type === 'bot_command') {
            return await bot.sendMessage(chatId, welcomeMsg(chatAuthor.username))
        }

        const responseMsg = await gptService.generateCompletion(chatMsg)
        if (responseMsg) {
            await Promise.all([
                databaseService.createNewMessage(chatAuthor, chatMsg, responseMsg),
                bot.sendMessage(chatId, responseMsg)
            ])
        }

    });
})

