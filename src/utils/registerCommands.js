// src/utils/registerCommands.js
const fs = require('fs');
const { REST, Routes } = require('discord.js');
require('dotenv').config();

async function registerCommands(clientId, guildId, token) {
  const commands = [];
  const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push({
      name: command.name,
      description: command.description,
      options: command.options || []
    });
  }

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log('[COMMANDS] Started refreshing application (/) commands.');

    // Guild-based (test server)
    if (guildId) {
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );
      console.log('[COMMANDS] Guild-based commands deployed.');
    }

    // Global commands
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );
    console.log('[COMMANDS] Global commands deployed.');
  } catch (error) {
    console.error('[COMMANDS] Error deploying commands:', error);
  }
}

module.exports = { registerCommands };
