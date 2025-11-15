// src/systems/initializeGuild.js
const { Guild, Country } = require('../database/models');

/**
 * Initialize default resources and army for a guild
 * @param {string} guildId
 * @param {string} guildName
 * @param {string} countryId
 */
async function initializeGuild(guildId, guildName, countryId) {
  const country = await Country.findOne({ countryId });
  if (!country) throw new Error('Country not found');

  // Eğer guild zaten varsa sadece güncelle
  let guild = await Guild.findOne({ guildId });
  if (!guild) {
    guild = await Guild.create({
      guildId,
      name: guildName,
      countryId,
      resources: {
        food: 100 + country.bonus.economy * 2,
        steel: 50 + country.bonus.economy,
        oil: 30 + country.bonus.economy,
        manpower: 50
      },
      army: {
        infantry: 10 + country.bonus.attack,
        armor: 5 + Math.floor(country.bonus.attack / 2),
        air: 2 + Math.floor(country.bonus.attack / 3)
      }
    });
  } else {
    guild.countryId = countryId;
    await guild.save();
  }

  return guild;
}

module.exports = { initializeGuild };
