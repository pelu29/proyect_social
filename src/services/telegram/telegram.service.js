const TelegramBot = require('node-telegram-bot-api');

class TelegramService {
    constructor() {
        if (!process.env.TELEGRAM_BOT_TOKEN) {
            console.error('❌ Error: TELEGRAM_BOT_TOKEN no encontrado en variables de entorno');
            return;
        }

        if (!process.env.TELEGRAM_CHAT_ID) {
            console.error('❌ Error: TELEGRAM_CHAT_ID no encontrado en variables de entorno');
            return;
        }

        this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
        this.chatId = process.env.TELEGRAM_CHAT_ID;
        console.log('✅ Servicio de Telegram inicializado correctamente');
    }

    async sendMessage(message) {
        try {
            if (!this.bot) {
                throw new Error('Bot no inicializado correctamente');
            }
            await this.bot.sendMessage(this.chatId, message);
            return true;
        } catch (error) {
            console.error('Error enviando mensaje a Telegram:', error.message);
            return false;
        }
    }
}

module.exports = new TelegramService();