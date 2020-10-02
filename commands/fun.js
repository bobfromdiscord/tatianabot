const Discord = require('discord.js');
const client = new Discord.Client
module.exports = {
    name: 'fun',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
        .setTitle('🛠Commands')
        .addField('🏓Fun', `a!rps - a game of rock paper scissors\na!8ball - ask away your questions\na!howgay - decides the rate for you or your friend!\na!kill - kill whoever you mention`)
        .setColor(0x7f32a8);
         message.channel.send(embed);
    }
}