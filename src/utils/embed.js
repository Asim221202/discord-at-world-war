// src/utils/embed.js
const { EmbedBuilder } = require('discord.js');

function createEmbed({ title, description, color = '#0099ff', fields = [], footer }) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color);

  if (fields.length) embed.addFields(fields);
  if (footer) embed.setFooter({ text: footer });

  return embed;
}

module.exports = { createEmbed };
