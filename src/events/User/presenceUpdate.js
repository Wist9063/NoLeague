const BotEvent = require('../../handlers/event.js');

module.exports = class extends BotEvent {
  constructor(client, filePath) {
    super(client, filePath, {
      name: 'presenceUpdate'
    });
  }

  
  execute(oldPresence, newPresence) {
    console.log(newPresence);

    // detect if user is playing Leauge of Legends
    if (newPresence.activities[0] && newPresence.activities[0].name === 'League of Legends') {
      console.log('hey, i see a league of legends player! sending them a message!');
      //newPresence.member.send('Hey, you are playing League of Legends! Stop! Or else...');
    }
  }
};