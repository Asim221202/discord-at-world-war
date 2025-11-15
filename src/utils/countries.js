// src/utils/countries.js
module.exports = [
  {
    countryId: 'NRD',
    name: 'Nordia',
    bonus: { attack: 0, defense: 5, economy: 10 },
    regionIds: ['NRD-1', 'NRD-2'],
    maxGuilds: 5
  },
  {
    countryId: 'SLR',
    name: 'Solara',
    bonus: { attack: 5, defense: 0, economy: 5 },
    regionIds: ['SLR-1', 'SLR-2'],
    maxGuilds: 5
  },
  {
    countryId: 'YMT',
    name: 'Yamatoku',
    bonus: { attack: 10, defense: 5, economy: 5 },
    regionIds: ['YMT-1', 'YMT-2'],
    maxGuilds: 5
  }
  // İlerleyen adımda diğer ülkeleri ekleyeceğiz
];
