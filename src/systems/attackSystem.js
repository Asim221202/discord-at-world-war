// src/systems/attackSystem.js
const { Guild, WorldLog } = require('../database/models');

async function attackCountry(attackerGuildId, targetCountryId) {
  const attackerGuild = await Guild.findOne({ guildId: attackerGuildId });
  if (!attackerGuild) throw new Error('Attacking guild bulunamadı');

  const targetGuilds = await Guild.find({ countryId: targetCountryId });
  if (!targetGuilds.length) throw new Error('Hedef ülke bulunamadı');

  // Basit saldırı formülü
  const attackerPower = attackerGuild.army.infantry + attackerGuild.army.armor * 2 + attackerGuild.army.air * 3;
  let defenderPower = 0;
  targetGuilds.forEach(g => {
    defenderPower += g.army.infantry + g.army.armor * 2 + g.army.air * 3;
  });

  const attackSuccess = attackerPower > defenderPower;

  // WorldLog kaydı
  await WorldLog.create({
    type: 'attack',
    countryId: attackerGuild.countryId,
    details: `${attackerGuild.guildId} ${targetCountryId} ülkesine saldırdı. Sonuç: ${attackSuccess ? 'Başarılı' : 'Başarısız'}`
  });

  return attackSuccess;
}

module.exports = { attackCountry };
