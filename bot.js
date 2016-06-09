var Botkit = require('botkit');
var fs = require('fs');
var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: process.env.SLACK_BOT_TOKEN
}).startRTM()



// give the bot something to listen for.
controller.hears(['hello','.*שבת.*','.*שלום.*','.*אמן.*'],['direct_message','direct_mention','mention'],function(bot,message) {
  fs.readFile('greets.txt', function(err, data){
    if(err) throw err;
    var lines = data.toString().split('\n');
    var greet = lines[Math.floor(Math.random() * lines.length)];
    bot.reply(message, greet);
  })
});
