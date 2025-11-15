// src/systems/selectCountry.js
const { Guild, Country } = require('../database/models');

/**
 * Select a country for the guild
 * @param {string} guildId - Discord guild ID
 * @param {string} guildName - Guild name
 * @param {string} countryId - Selected country ID
 * @returns {Promise<string>} - Result message
 */
async function selectCountry(guildId, guildName, countryId) {
  const country = await Country.findOne({ countryId });
  if (!country) return 'The selected country does not exist.';

  // Country max guild limit check
  const guildCount = await Guild.countDocuments({ countryId });
  if (guildCount >= country.maxGuilds) {
    return `The maximum number of guilds in ${country.name} has been reached.`;
  }

  // Guild DB record
  let guild = await Guild.findOne({ guildId });
  if (!guild) {
    guild = await Guild.create({
      guildId,
      name: guildName,
      countryId
    });
    return `${guildName} has been successfully registered to ${country.name}.`;
  } else {
    guild.countryId = countryId;
    await guild.save();
    return `${guildName}'s country has been successfully updated to ${country.name}.`;
  }
}

module.exports = { selectCountry };
