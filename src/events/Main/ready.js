const BotEvent = require('../../handlers/event.js');
const figlet = require('figlet');
const moment = require('moment-timezone');

module.exports = class extends BotEvent {
  constructor(client, filePath) {
    super(client, filePath, {
      name: 'ready'
    });
  }

  
  execute() {
    console.log('<---------------->');
    console.log('Connection to discord initialized. NoLeauge is now initializing! Please wait..');
    console.log('<---------------->');
    console.log(figlet.textSync('NoLeauge', {
      font: 'Slant Relief',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    }));

    const gameCycle = function(a) {
      const gameStatus = [
        ['PLAYING', 'not leauge'],
        ['LISTENING', 'the leauge player'],
        ['COMPETING', 'kicking leauge players'],
      ];
      const game = gameStatus[Math.floor(Math.random()*gameStatus.length)];
      a.user.setActivity(game[1], {'url': 'https://www.twitch.tv/monstercat', 'type': game[0] });
      setTimeout(() => {
        gameCycle(a);
      }, 300000);
    };
    console.log('Set game status.');

    console.log('\nWelcome to NoLeauge. Info will be printed below.');
    
    console.log('<---------------->');
    console.log(`Guild Size: ${this.guilds.cache.size}\nUser Size: ${this.users.cache.size}\nChannels: ${this.channels.cache.size}\nUsing account: ${this.user.tag}\nLaunched at ${moment(this.readyAt).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm:ss A')}`);
    
    gameCycle(this);
    console.log('<---------------->');
  }
};