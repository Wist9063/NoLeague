/*
 * Written by wist9063 <josh@joshlol.xyz> and contributors (see CONTRIBUTORS.md)
 *
 *  ________   ________  ___       _______   ________  ___  ___  ________  _______
 *  |\   ___  \|\   __  \|\  \     |\  ___ \ |\   __  \|\  \|\  \|\   ____\|\  ___ \
 *  \ \  \\ \  \ \  \|\  \ \  \    \ \   __/|\ \  \|\  \ \  \\\  \ \  \___|\ \   __/|
 *   \ \  \\ \  \ \  \\\  \ \  \    \ \  \_|/_\ \   __  \ \  \\\  \ \  \  __\ \  \_|/__
 *    \ \  \\ \  \ \  \\\  \ \  \____\ \  \_|\ \ \  \ \  \ \  \\\  \ \  \|\  \ \  \_|\ \
 *     \ \__\\ \__\ \_______\ \_______\ \_______\ \__\ \__\ \_______\ \_______\ \_______\
 *      \|__| \|__|\|_______|\|_______|\|_______|\|__|\|__|\|_______|\|_______|\|_______|
 *
 */

const path = require('path');
const klaw = require('klaw');
const {Client, Collection, Intents} = require('discord.js');

const commandsPath = path.join(__dirname, 'commands');
const eventsPath = path.join(__dirname, 'events');

const intents = new Intents();
intents.add('GUILD_PRESENCES', 'GUILD_MEMBERS');


new class extends Client {
  constructor() {
    super({
      intents: intents,
      allowedMentions: {parse: ['users', 'roles']},
    });

    this.commands = new Collection();
    this.init();
    this.initEvents();
    this.connect();
  }

  async connect() {
    console.log('<---------------->');
    console.log('Initializing connection to DiscordAPI.');

    await this.login().then(() => console.log('DiscordAPI has now connected.')).catch((e) => {
      console.error('An error has occurred during the connecting phase for the DiscordAPI connection, check console!');
      console.error(e);
    });
  }

  async reloadCommands() {
    console.log('Command reload triggered.');
    await klaw(commandsPath).on('data', (item) => {
      const file = path.parse(item.path);
      if (!file.ext || file.ext != '.js') return;
      const fileName = `${file.dir}/${file.base}`;
      delete require.cache[require.resolve(fileName)];
      const command = new (require(fileName))(this);
      this.commands.set(command.name, command);
    });
    return 'Command Reloading Finished.';
  }

  async reloadEvents() {
    console.log('Events reload triggered.');
    await klaw(eventsPath).on('data', (item) => {
      const file = path.parse(item.path);
      if (!file.ext || file.ext != '.js') return;
      const fileName = `${file.dir}/${file.base}`;
      delete require.cache[require.resolve(fileName)];
      const event = new (require(fileName))(this);
      console.log('Loaded' + event.name);
      this.on(event.name, event.execute);
    });
    return 'Event Reloading Finished.';
  }

  fetchCommand(text) {
    return new Promise((resolve) => {
      if (this.commands.has(text)) return resolve(this.commands.get(text));
      this.commands.forEach((c) => {
        if (c.aliases && c.aliases.includes(text)) return resolve(c);
      });
      return resolve();
    });
  }

  init() {
    klaw(commandsPath).on('data', (item) => {
      const file = path.parse(item.path);
      if (!file.ext || file.ext !== '.js') return;

      const command = new (require(`${file.dir}/${file.base}`))(this);
      this.commands.set(command.name, command);
    });
  }

  initEvents() {
    klaw(eventsPath).on('data', (item) => {
      const file = path.parse(item.path);
      if (!file.ext || file.ext !== '.js') return;

      const event = new (require(`${file.dir}/${file.base}`))(this);
      this.on(event.name, event.execute);
    });
  }
};

process.on('uncaughtException', (err) => console.error(err.stack));
process.on('unhandledRejection', (err) => console.error(err.stack));

// end of file
