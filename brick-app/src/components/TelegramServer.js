const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const token = process.env.REACT_APP_TELEGRAM_API_KEY;
const bot = new TelegramBot(token, { polling: false });

app.post('/your-webhook-url', (req, res) => {
  const chatId = req.body.message.chat.id;
  const messageText = req.body.message.text;

  // Handle the message and send a response
  bot.sendMessage(chatId, 'Hello from your Brickbot!');

  res.sendStatus(200);
});

app.listen(3000, () => console.log('Telegram server started on port 3000'));
