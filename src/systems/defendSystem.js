// src/systems/defendSystem.js
const { Guild, WorldLog } = require('../database/models');

async function defendCountry(targetCountryId) {
  const targetGuilds = await Guild.find({ countryId: targetCountryId });
  if (!targetGuilds.length) return false;

  let totalDefense = 0;
  targetGuilds.forEach(g => {
    totalDefense += g.army.infantry + g.army.armor * 2 + g.army.air * 3;
  });

  // Savunma bonusu basit örnek
  const success = totalDefense > 100; // threshold, ileride dinamik yapacağız

  // WorldLog kaydı
  await WorldLog.create({
    type: 'defense',
    countryId: targetCountryId,
    details: `Savunma yapıldı. Sonuç: ${success ? 'Başarılı' : 'Başarısız'}`
  });

  return success;
}

module.exports = { defendCountry };
