const Discord = require('discord.js');
const client = new Discord.Client
module.exports = {
    name: 'purge',
    execute(message, args){
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.send("You can't use this command!");
      if(!args[1]) return message.channel.send("Specify how many messages you want to delete.");
      message.channel.bulkDelete(args[1]);
      message.channel.send(`Successfully deleted \`${args[1]} messages\``).then(m => message.delete({ timeout: 5000}));
    }
}