// src/systems/worldTick.js
const { Guild, Country, WorldLog } = require('../database/models');
const { worldTickInterval } = require('../config');

////////////////////////
// World Tick Sistemi
////////////////////////
async function processWorldTick() {
  console.log('[WORLD] Tick başladı');

  const countries = await Country.find();

  for (const country of countries) {
    const guilds = await Guild.find({ countryId: country.countryId });
    let totalArmy = { infantry: 0, armor: 0, air: 0 };
    let totalResources = { food: 0, steel: 0, oil: 0, manpower: 0 };

    guilds.forEach(g => {
      totalArmy.infantry += g.army.infantry;
      totalArmy.armor += g.army.armor;
      totalArmy.air += g.army.air;

      totalResources.food += g.resources.food;
      totalResources.steel += g.resources.steel;
      totalResources.oil += g.resources.oil;
      totalResources.manpower += g.resources.manpower;
    });

    // Basit ekonomi üretimi
    guilds.forEach(async g => {
      g.resources.food += 10 + country.bonus.economy;
      g.resources.steel += 5 + country.bonus.economy;
      g.resources.oil += 3 + country.bonus.economy;
      await g.save();
    });

    // Log ekle
    await WorldLog.create({
      type: 'tick',
      countryId: country.countryId,
      details: `Ülke tick işlendi. Toplam ordu: ${totalArmy.infantry} infantry`
    });

    console.log(`[WORLD] ${country.name} işlendi`);
  }

  console.log('[WORLD] Tick tamamlandı');
}

////////////////////////
// Tick başlat
////////////////////////
function startWorldTick() {
  processWorldTick(); // hemen çalıştır
  setInterval(processWorldTick, worldTickInterval); // periyodik çalıştır
}

module.exports = { startWorldTick };
