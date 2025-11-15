// src/bot.js
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const { token, mongoURI, worldTickInterval } = require('./config');
const { Country, Guild, Player, WorldLog } = require('./database/models');
const { startWorldTick } = require('./systems/worldTick');
const countriesData = require('./utils/countries');
const { registerCommands } = require('./utils/registerCommands');
require('dotenv').config();
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
  await registerCommands(process.env.CLIENT_ID, process.env.GUILD_ID, process.env.BOT_TOKEN);
  // World tick sistemini başlat
  startWorldTick();
});

////////////////////////
// guildCreate event
////////////////////////
// bot.js (guildCreate)
const { createEmbed } = require('./utils/embed');

// bot.js (guildCreate event)
const { initializeGuild } = require('./systems/initializeGuild');

client.on('guildCreate', async guild => {
  console.log(`[GUILD] Bot added to: ${guild.name} (${guild.id})`);

  // Embed mesajı
  const fields = countriesData.map(country => ({
    name: `${country.name} (${country.countryId})`,
    value: `**Bonuses:** Attack: ${country.bonus.attack}, Defense: ${country.bonus.defense}, Economy: ${country.bonus.economy}\n**Max Guilds:** ${country.maxGuilds}`,
    inline: false
  }));

  const embed = createEmbed({
    title: 'Welcome to World War Bot!',
    description: 'Please select a country for your guild using the `/select-country` command. Here are the available countries:',
    color: '#00ff99',
    fields: fields,
    footer: 'Use /select-country <country_id> to choose your country.'
  });

  const defaultChannel = guild.channels.cache
    .filter(c => c.type === 0 && c.permissionsFor(guild.members.me).has('SendMessages'))
    .first();

  if (defaultChannel) defaultChannel.send({ embeds: [embed] });

  // NOT: Guild henüz ülke seçmedi, resources ve army country bonus ile sonra initialize edilecek
});

client.login(token);
