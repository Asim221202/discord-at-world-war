// src/bot.js
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const { token, mongoURI, worldTickInterval } = require('./config');
const { Country, Guild, Player, WorldLog } = require('./database/models');
const { startWorldTick } = require('./systems/worldTick');
const countriesData = require('./utils/countries');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

////////////////////////
// MongoDB Bağlantısı
////////////////////////
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('[DB] MongoDB bağlandı');
  initializeCountries();
}).catch(err => console.error('[DB] MongoDB Hatası:', err));

////////////////////////
// Ülkeleri Başlat
////////////////////////
async function initializeCountries() {
  for (const country of countriesData) {
    const exists = await Country.findOne({ countryId: country.countryId });
    if (!exists) {
      await Country.create(country);
      console.log(`[DB] Ülke eklendi: ${country.name}`);
    }
  }
}

////////////////////////
// Bot Hazır Oldu
////////////////////////
client.once('ready', () => {
  console.log(`[BOT] ${client.user.tag} aktif!`);
  // World tick sistemini başlat
  startWorldTick();
});

////////////////////////
// guildCreate event
////////////////////////
client.on('guildCreate', guild => {
  console.log(`[GUILD] Bot eklendi: ${guild.name} (${guild.id})`);
  // Burada ülke seçme paneli ilerleyen adımda gelecek
});

client.login(token);
