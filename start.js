const blessed = require('blessed');
const chalk = require('chalk');
const { spawn } = require('child_process');
const os = require('os');
const moment = require('moment');
const figlet = require('figlet');
moment.locale('pt-BR')

const screen = blessed.screen({
  smartCSR: true,
  title: 'Discord Bot'
});

const box = blessed.box({
  top: 0,
  left: 0,
  width: '80%',
  height: '100%',
  content: '',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#001eff'
    },
  }
});

const consoleBox = blessed.box({
  top: 0,
  right: 0,
  width: '20%',
  height: '100%',
  content: '{underline}Console{/underline}',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black', 
    border: {
      fg: '#001eff'
    },
  }
});

screen.append(box);
screen.append(consoleBox);

let bot = null;
let botStartTime = null;
let lastButtonUsed = null;
let botStatus = 'Offline';
let botUsername = 'TESTE#9111';

function startBot() {
  if (bot) {
    writeToConsole(chalk.blue('O bot já está em execução. Por favor, pare o bot primeiro.'));
    return;
  }

  bot = spawn('node', ['index.js'], {
    stdio: ['pipe', 'pipe', 'pipe', 'pipe', 'pipe', 'pipe', process.stderr]
  });

  botStartTime = moment();
  botStatus = 'Online';

  updateStats(); 
  lastButtonUsed = 'S';

  bot.on('error', (err) => {
    writeToConsole(chalk.blue(`Erro ao iniciar bot: ${err.message}`));
  });

  bot.stdout.on('data', (data) => {
    writeToConsole(data.toString());
  });

  bot.stderr.on('data', (data) => {
    writeToConsole(chalk.blue(data.toString()));
  });
}

function stopBot() {
  if (!bot) {
    writeToConsole(chalk.blue('O bot não está em execução. Inicie o bot primeiro.'));
    return;
  }

  writeToConsole(chalk.blue('Parando bot...'));

  bot.kill();
  bot = null;
  botStatus = 'Offline';
  lastButtonUsed = 'X';

  setTimeout(() => {
    updateStats();
  }, 1000);
}

// Function to restart the Discord bot.
function restartBot() {
  stopBot();
  setTimeout(() => {
    startBot();
    writeToConsole(chalk.blue('Bot reiniciado...'));
  }, 1000);
  lastButtonUsed = 'R';
}

function refreshConsole() {
  lastButtonUsed = 'L';
  consoleBox.setContent('{underline}Console{/underline}');
  writeToConsole('Console atualizado.');
  screen.render();
}

let title = '';
figlet.text('Central City', {
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80,
  whitespaceBreak: true
}, function(err, data) {
  if (err) {
    console.log('Algo deu errado...');
    console.dir(err);
    return;
  }
  title = chalk.blue(data);
});

function updateStats() {
  const serverUptime = moment.duration(os.uptime() * 1000).humanize();
  const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  const cpuCores = os.cpus().length.toString();
  const osInfo = `${os.type()} (${os.release()})`;

  const botUptime = botStartTime ? moment.duration(moment().diff(botStartTime)).humanize() : 'Não disponível';
  const botMemoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024 / 1024).toFixed(2) + ' GB';

  box.setContent(`${title}\n\n` +
    `${chalk.blue('🌟 Bot status:')} ${botStatus === 'Online' ? chalk.green(botStatus) : chalk.blue(botStatus)}\n\n` +
    `${chalk.blue('Bot Prefix:')} ${chalk.green('/')}\n` +
    `${chalk.blue('Bot Username:')} ${chalk.green(botUsername)}\n\n` +
    `${chalk.blue('Server Uptime:')} ${chalk.green(serverUptime)}\n` +
    `${chalk.blue('Total Memory:')} ${chalk.green(totalMemory)}\n` +
    `${chalk.blue('Bot Uptime:')} ${chalk.green(botUptime)}\n` +
    `${chalk.blue('Bot Memory Usage:')} ${chalk.green(botMemoryUsage)}\n` +
    `${chalk.blue('CPU Cores:')} ${chalk.green(cpuCores)}\n` +
    `${chalk.blue('OS Info:')} ${chalk.green(osInfo)}\n\n` +
    `${chalk.blue('Comandos:')}\n` +
    `${chalk.blue('S')} - ${chalk.blue('Iniciar bot')}\n` +
    `${chalk.blue('X')} - ${chalk.blue('Desligar bot')}\n` +
    `${chalk.blue('R')} - ${chalk.blue('Reiniciar bot')}\n` +
    `${chalk.blue('L')} - ${chalk.blue('Atualizar console')}\n` +
    `${chalk.blue('Último botão usado:')} ${chalk.green(lastButtonUsed || 'Nenhum')}\n\n` +
    `${chalk.blue('Pressione:')} ${chalk.green('Ctrl+C')} ${chalk.blue('para parar o bot e sair.')}`
  );
  screen.render();
}

function writeToConsole(message) {
  const content = consoleBox.getContent();
  const newContent = `${content}\n${chalk.green(message)}`;
  consoleBox.setContent(newContent);
  screen.render();
}

updateStats();
setInterval(updateStats, 60000);

process.on('SIGINT', () => {
  stopBot();
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});

screen.key(['S', 's'], () => {
  startBot();
});

screen.key(['X', 'x'], () => {
  stopBot();
});

screen.key(['R', 'r'], () => {
  restartBot();
});

screen.key(['L', 'l'], () => {
  refreshConsole();
});

// Render the screen.
screen.render();