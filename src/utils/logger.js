// src/utils/logger.js
const chalk = require('chalk');

module.exports = {
  info: (msg) => console.log(chalk.blue('[INFO]'), msg),
  warn: (msg) => console.log(chalk.yellow('[WARN]'), msg),
  error: (msg) => console.log(chalk.red('[ERROR]'), msg),
  success: (msg) => console.log(chalk.green('[SUCCESS]'), msg)
};
