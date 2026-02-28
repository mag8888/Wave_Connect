import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) {
    console.error('BOT_TOKEN is not defined in the environment variables');
    process.exit(1);
}

const bot = new Telegraf(token);
// Replace with your actual front-end URL when deployed
const webAppUrl = process.env.WEBAPP_URL || 'https://example.com';

bot.command('start', (ctx) => {
    ctx.reply('Welcome to Wave Match! 🌊\nClick the button below to launch the networking platform.', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Open Wave Match', web_app: { url: webAppUrl } }]
            ]
        }
    });
});

bot.launch().then(() => {
    console.log('Bot is running');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
