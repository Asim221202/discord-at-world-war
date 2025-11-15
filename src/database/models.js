// src/database/models.js
const mongoose = require('mongoose');

///////////////////////
// Country Model
///////////////////////
const CountrySchema = new mongoose.Schema({
  countryId: { type: String, unique: true }, // Örn: NRD, SLR
  name: { type: String, required: true },
  bonus: {
    attack: { type: Number, default: 0 },
    defense: { type: Number, default: 0 },
    economy: { type: Number, default: 0 }
  },
  regionIds: [String], // Harita bölgeleri
  maxGuilds: { type: Number, default: 5 }, // ülkeye max sunucu limiti
  createdAt: { type: Date, default: Date.now }
});

const Country = mongoose.model('Country', CountrySchema);

///////////////////////
// Guild Model
///////////////////////

const GuildSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  countryId: { type: String },
  language: { type: String, default: 'en' },

  resources: {
    food: { type: Number, default: 100 },
    steel: { type: Number, default: 50 },
    oil: { type: Number, default: 30 },
    manpower: { type: Number, default: 50 }
  },

  army: {
    infantry: { type: Number, default: 10 },
    armor: { type: Number, default: 5 },
    air: { type: Number, default: 2 }
  }
});

const Guild = mongoose.model('Guild', GuildSchema);

module.exports = { Guild };

///////////////////////
// Player Model
///////////////////////
const PlayerSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  guildId: { type: String, required: true }, // Bu oyuncu hangi guild’e ait
  rank: { type: String, default: 'Soldier' }, // Örn: Soldier, Captain
  contribution: { type: Number, default: 0 }, // Ülkeye katkı puanı
  armyCommanded: {
    infantry: { type: Number, default: 0 },
    armor: { type: Number, default: 0 },
    air: { type: Number, default: 0 }
  },
  lastAction: { type: Date, default: Date.now }
});

const Player = mongoose.model('Player', PlayerSchema);

///////////////////////
// World Log Model
///////////////////////
const WorldLogSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Örn: 'attack', 'defense', 'event'
  countryId: { type: String, required: true },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const WorldLog = mongoose.model('WorldLog', WorldLogSchema);

///////////////////////
module.exports = {
  Country,
  Guild,
  Player,
  WorldLog
};
