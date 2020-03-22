const commando = require('discord.js-commando');
const bot = new commando.Client();

// Default commands such as help
bot.registry.registerDefaults();

bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('github', 'Github');
bot.registry.registerCommandsIn(__dirname + "/commands");

// Set current bot status when application has succesfully started
bot.on("ready", () => {
    console.log("Zep is currently running...");
    bot.user.setActivity("Help: @Zeppy#0420");
  });



// read key.txt file to get Token (only contains token)
// file is gitIgnored for security.
const getLoginKey = () => {
    var fs = require("fs");
    key = fs.readFileSync("./key.txt").toString();
    return key;
}


//Token from https://discordapp.com/developer
bot.login(getLoginKey());


