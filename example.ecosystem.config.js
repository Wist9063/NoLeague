module.exports = {
  apps : [
    {
      name: 'NoLeague',
      script: './src/index.js',
      env: {
        'NODE_ENV': 'development',
        'DISCORD_TOKEN': '',
        'colors': {
          'blue': '#7289DA',
          'red_event': '#DD5449',
          'green_event': '#5cb85c',
          'blue_event': '#5bc0de'
        }
      },
      env_production: {
        'NODE_ENV': 'production'
      }
    }
  ]
};
  