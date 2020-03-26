const commando = require('discord.js-commando');
const fetch = require("node-fetch");
const { RichEmbed } = require('discord.js');

// Add return statement for repo not found.

class getRepository extends commando.Command {

    constructor(client){
        super(client, {
            name: 'repo',
            group: 'github',
            memberName: 'repo',
            description: 'Retreives repository and its information, !repo <userName>/<repoName>',
            args: [
                {
                    key: 'repos',
                    prompt: 'what is the repository name(<user>/<repositoryName>)?',
                    type: 'string'
                }
            ]
        });
    }

    run(message, { repos }){
        try {
            this.getRepo(message, repos);
        }
        catch (error){
            console.log(error);
        }
    }

    /*
    Retreives the repository.
    Convert response to JSON object and passes it to create the Message.
    Finally sends the message to the discord server.
    */
    getRepo(message, repository){
        fetch("https://api.github.com/repos/" + repository)
        .then(response => response.json())
        .then(responseData => {
            if(responseData.hasOwnProperty('message')){
                message.channel.send("The repository " + repository + " was not found.");
            } else {
                var eMessage = this.createMessage(responseData)
                message.channel.send(eMessage);
            }
            
        })
        .catch(err => console.log(err))        
    }

    // Creates embedded message with details from the fetch response.
    createMessage(response){
        const embeddedMessage = new RichEmbed()
        .setColor(0xFF0092)
        .setTitle(response.name)
        .setDescription(response.description)
        .setURL(response.html_url)
        .setThumbnail(response.owner.avatar_url)
        .addField("Author", response.owner.login)
        .addField("Url", response.html_url)
        .addField("Clone_url", response.clone_url)
        .addField("Created", this.convertDate(response.created_at))
        .addField("Updated", this.convertDate(response.updated_at))

        return embeddedMessage;
    }

    // Converts a date string from YYYY-mm-dd to dd-mm-YYYY 
    convertDate(date){
        var time = date.substring(11,19);
        var result = date.substring(0,10);
        var p = result.split("-");
        result = [p[2], p[1], p[0]].join("-");

        return result + " " + time;
    }
}

module.exports = getRepository;