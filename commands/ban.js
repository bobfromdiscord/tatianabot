const Discord = require('discord.js');
const client = new Discord.Client
module.exports = {
    name: 'ban',
    execute(message, args, msg, prefix){
        if(message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission("ADMINISTRATOR")){
            if(!args[1]){
                return message.channel.send('Please include who you are banning.')
            }
            var user = message.mentions.members.first();
            user.ban().then((user) =>{
                message.channel.send('That user was succesfully banned.')
            }).catch(() => {
                message.channel.send('There was an error attempting this')
            })

        }else{
            return message.channel.send('You do not have permissions.')
        }
    }
}