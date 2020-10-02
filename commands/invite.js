const Discord = require('discord.js');
const client = new Discord.Client
module.exports = {
    name: 'invite',
    execute(message, args, msg){
        const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Invite link')
	.setURL('https://discord.com/oauth2/authorize?client_id=744804741409800234&scope=bot')
	.setAuthor( message.author.username, message.author.avatarURL())
	.setTimestamp()

message.channel.send(exampleEmbed);
    }
}