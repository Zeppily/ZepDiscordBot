const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'roll',
            group: 'random', //linked to index.js name
            memberName: 'roll',
            description: 'Rolls a dice'
        });
    }

    async run(message, args){
        try {
            var roll = Math.floor(Math.random() * 6) + 1;
            message.channel.send("You rolled a " + roll);
        }
        catch (error){
            message.reply("something went wrong");
        }
    }
}

module.exports = DiceRollCommand;