const Discord = require('discord.js');
const client = new Discord.Client
module.exports = {
    name: 'kill',
    execute(message, args){
        let user = message.mentions.users.first();
        if(!user){
            return message.channel.send('Please include who you are killing.')
        }
        return message.channel.send(message.author.username + ' killed '+user.username)
    }
}