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
const webAppUrl = process.env.WEBAPP_URL || 'https://wave-match.up.railway.app';

bot.start((ctx) => {
    const startPayload = ctx.payload; // e.g., ref_12345
    let finalUrl = webAppUrl;

    // If you need to pass it explicitly in the inline button (though Telegram auto-passes it via startapp if configured right)
    // we can append it as a query param just in case, but standard WebAppData includes it.
    if (startPayload) {
        finalUrl = `${webAppUrl}?startapp=${startPayload}`;
    }

    ctx.reply('Welcome to Wave Match! 🌊\nClick the button below to launch the networking platform.', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Open Wave Match', web_app: { url: finalUrl } }]
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
