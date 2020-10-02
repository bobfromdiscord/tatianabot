const Discord = require('discord.js');
const client = new Discord.Client
module.exports = {
    name: 'howgay',
    execute(message, args){
        let number = Math.floor(Math.random() * 101);
        if(!args[1]) {
        return message.channel.send('You are ' + number + '% gay🌈')
        } else {
            let user = message.mentions.users.first();
            if (!user){
                return message.channel.send('Please include who you are rating.')
            }
            return message.channel.send('I would rate '+user.username+' '+ number+ '% gay🌈')
        }
    }
}