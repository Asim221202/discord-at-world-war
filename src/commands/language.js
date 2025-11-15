// commands/language.js
const { Guild } = require('../database/models');

module.exports = {
  name: 'language',
  description: 'Set the language for this guild',
  options: [
    {
      name: 'lang',
      description: 'Language code (en / tr)',
      type: 3,
      required: true
    }
  ],
  async execute(interaction) {
    const lang = interaction.options.getString('lang').toLowerCase();
    if (!['en', 'tr'].includes(lang)) {
      return interaction.reply({ content: 'Invalid language. Supported: en, tr', ephemeral: true });
    }

    let guild = await Guild.findOne({ guildId: interaction.guild.id });
    if (!guild) {
      guild = await Guild.create({ guildId: interaction.guild.id, name: interaction.guild.name, language: lang });
    } else {
      guild.language = lang;
      await guild.save();
    }

    await interaction.reply({ content: `Language set to ${lang}`, ephemeral: true });
  }
};
