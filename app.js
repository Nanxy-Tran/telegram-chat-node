import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import admin from 'firebase-admin';

dotenv.config();

const telegramToken = process.env.TELEGRAM_BOT_KEY;
const appCheckID = process.env.APP_CHECK_ID

const bot = new TelegramBot(telegramToken, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const chatMsg = msg.text;

    admin.initializeApp({
        credential: admin.credential.cert("./credential/service_account.json")
    })

    if (chatMsg === 'please-token') {
        const token = await admin.appCheck().createToken(appCheckID, {
            ttlMillis: 3600000,
        });
        return bot.sendMessage(chatId, token.token)
    }
});

