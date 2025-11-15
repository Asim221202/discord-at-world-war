// src/config.js
module.exports = {
  token: process.env.BOT_TOKEN,          // Discord bot token
  mongoURI: process.env.MONGO_URI,       // MongoDB URI
  worldTickInterval: 5 * 60 * 1000       // World tick: 5 dakikada 1
};
