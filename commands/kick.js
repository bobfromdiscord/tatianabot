const Discord = require('discord.js');
const client = new Discord.Client
module.exports = {
    name: 'kick',
    execute(message, args, msg){
        if(message.member.hasPermission('KICK_MEMBERS') || message.member.hasPermission("ADMINISTRATOR")){
            if(!args[1]){
                return message.channel.send('Please include who you are kicking.')
            }
            var user = message.mentions.members.first();
            user.kick().then((user) =>{
                message.channel.send('That user was succesfully kicked.')
            }).catch(() => {
                message.channel.send('There was an error attempting this')
            })

        }else{
            return message.channel.send('You do not have permissions.')
        }
    }
}