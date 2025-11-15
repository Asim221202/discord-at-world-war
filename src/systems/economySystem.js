// src/systems/economySystem.js
const { Guild, Country } = require('../database/models');

async function processEconomy() {
  const countries = await Country.find();

  for (const country of countries) {
    const guilds = await Guild.find({ countryId: country.countryId });
    guilds.forEach(async g => {
      g.resources.food += 10 + country.bonus.economy;
      g.resources.steel += 5 + country.bonus.economy;
      g.resources.oil += 3 + country.bonus.economy;
      await g.save();
    });
  }
}

module.exports = { processEconomy };
