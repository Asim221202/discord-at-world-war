// commands/select-country.js
const { selectCountry } = require('../systems/selectCountry');
const { initializeGuild } = require('../systems/initializeGuild');

module.exports = {
  name: 'select-country',
  description: 'Select a country for your guild',
  options: [
    {
      name: 'country',
      description: 'Country ID to choose (e.g., NRD)',
      type: 3,
      required: true
    }
  ],
  async execute(interaction) {
    const countryId = interaction.options.getString('country').toUpperCase();
    const guildId = interaction.guild.id;
    const guildName = interaction.guild.name;

    // Country selection
    const result = await selectCountry(guildId, guildName, countryId);

    // Initialize resources and army
    await initializeGuild(guildId, guildName, countryId);

    await interaction.reply({ content: result, ephemeral: true });
  }
};
