module.exports = {
  apps : [
    {
      name: 'NoLeauge',
      script: './src/index.js',
      env: {
        'NODE_ENV': 'development',
        'DISCORD_TOKEN': 'OTQyMjgwNjkyNTIyNDE4MTk3.YgiNRw.iW1nc8Q2h6xSoy7M9RW_xgMw_HU',
        'colors': {
          'blue': '#7289DA',
          'red_event': '#DD5449',
          'green_event': '#5cb85c',
          'blue_event': '#5bc0de'
        },
        'idebug': true
      },
      env_production: {
        'NODE_ENV': 'production',
        'DISCORD_TOKEN': '',
        'WATCHER_DB': 'watcher',
        'mdbKEY': 'watcher:c05AwBzjWSVE31x4',
        'sDSN': '04da88b037804128b89ceabefb36d125',
        'sID': '1853372'
      }
    }
  ]
};