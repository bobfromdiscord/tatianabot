const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Bot is online.');
}

const server = http.createServer(requestListener);
server.listen(8080);

const Discord = require('discord.js')
const { Client, Util } = require('discord.js')
const client = new Discord.Client({disableEveryone: true});
 const prefix = 'a!';
 const PREFIX = 'a!';
 const Youtube = require('simple-youtube-api')
 const youtube = new Youtube("AIzaSyDc2-IoMvgH8epZdOBL8mXJmzdWTAfDjOI")
 const queue = new Map();
 const ytdl = require("ytdl-core");
 const fs = require('fs');
 const covid = require('novelcovid')
 var guildconf = require('./guildconf.json');
 client.commands = new Discord.Collection();
 const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

 const { error } = require('console');
const { url } = require('inspector');
client.once('ready', () => {
    console.log('This bot is online!');
    client.user.setActivity(client.guilds.cache.size + " servers", {type: "WATCHING"})
})

    for(const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}
 
client.on('message', message => {
    let msg = message.content.toLowerCase();
    let args = message.content.substring(prefix.legnth).split(" ");

    if (!guildconf[message.channel.id]){
        guildconf[message.channel.id] = {
            prefix: 'a!'
        }
    }
    fs.writeFile('./guildConf.json', JSON.stringify(guildconf, null, 2), (err) =>{
        if (err) console.log(err);
    })
    if(msg.startsWith(guildconf[message.channel.id].prefix + 'prefix')){
        if (message.member.hasPermission("MANAGE_GUILD") || message.member.hasPermission('ADMINISTRATOR')){
        if(!args[1]){
            return message.channel.send('Please include new prefix.')
        }
        guildconf[message.channel.id].prefix = (args[1]).toLowerCase();
        fs.writeFile('./guildConf.json', JSON.stringify(guildconf, null, 2), (err) =>{
            if (err) console.log(err);
        })
        return message.channel.send(' The new prefix for this server is ' + (args[1]).toLowerCase() + '"')
    } else {
        return message.channel.send("You require the manage server perms to use this")
    }
    }
    if (msg.startsWith(guildconf[message.channel.id].prefix + 'kick')) {
      client.commands.get('kick').execute(message, args)
     }
     if (msg.startsWith(guildconf[message.channel.id].prefix + 'ban')) {
      client.commands.get('ban').execute(message, args)
     }
     if (msg.startsWith(guildconf[message.channel.id].prefix + 'help')){
        const embed = new Discord.MessageEmbed()
        .setTitle('🛠Commands')
        .addField('⛓General', `a!help general - general bot commands`)
        .addField('⚙Moderate', `a!help moderate - moderation commands`)
        .addField('🏓Fun', `a!help fun - Fun commands!`)
        .addField(`♫Music`, `a!help music - Music Commands!`)
        .addField(`Help`, `a!help - Shows this message\na!prefix - Changes the bot's prefix`)
        .setColor(0x7f32a8)
        .setTimestamp()
        if(!args[1]) return message.channel.send(embed)
      }
      if ((args[1]) == 'general'){
        const general = new Discord.MessageEmbed()
        .setTitle('🛠General')
        .addField('⛓General', `a!purge - Deletes the amount of messages you choose (below 100)\na!invite - Invite TatianaBot to your server!\na!covid - shows current Covid-19 stats`)
        .setColor(0x7f32a8)
        .setTimestamp()
        return message.channel.send(general)
    }
    if ((args[1]) == 'moderate'){
        const general = new Discord.MessageEmbed()
        .setTitle('🛠General')
        .addField('⚙Moderate', `a!ban - Bans a server member.\na!kick - Kicks a server member`)
        .setColor(0x7f32a8)
        .setTimestamp()
        return message.channel.send(general)
    }
    if ((args[1]) == 'fun'){
        const fun = new Discord.MessageEmbed()
        .setTitle('🛠General')
        .addField('🏓Fun', `a!rps - A game of rock paper scissors\na!8ball - Ask away your questions\na!howgay - Decides the rate for you or your friend!\na!kill - Kill whoever you mention`)
        .setColor(0x7f32a8)
        .setTimestamp()
        return message.channel.send(fun)
    }
    if ((args[1]) == 'music'){
        const music = new Discord.MessageEmbed()
        .setTitle('🛠Commands')
        .addField('♫Music', `a!play - plays the youtue url you send\na!stop - stops the song playing\na!skip - skips a song in the queue.\nqueue - shows the current queue\n\nvolume args[1] - changes the volume or displays the current volume\nbassboost - bass boost the songs you are playing!`)
        .setColor(0x7f32a8);
         message.channel.send(music);
    }
     if (msg.startsWith(guildconf[message.channel.id].prefix + 'invite')){
        client.commands.get('invite').execute(message, args)
    }
    if (msg.startsWith(guildconf[message.channel.id].prefix + 'music')){
        client.commands.get('music').execute(message, args)
    }
    if (msg.startsWith(guildconf[message.channel.id].prefix + 'avatar')){
        client.commands.get('avatar').execute(message, args)
    }
});

client.on('message', message => {
    let msg = message.content.toLowerCase();
    let args = message.content.substring(prefix.legnth).split(" ");

    if (!guildconf[message.channel.id]){
        guildconf[message.channel.id] = {
            prefix: 'a!'
        }
    }
    fs.writeFile('./guildConf.json', JSON.stringify(guildconf, null, 2), (err) =>{
        if (err) console.log(err);
    })
    if (msg.startsWith(guildconf[message.channel.id].prefix + 'rps')){
        client.commands.get('rps').execute(message, args)
    }
    if (msg.startsWith(guildconf[message.channel.id].prefix + '8ball')){
        client.commands.get('8ball').execute(message, args)
    }
    if (msg.startsWith(guildconf[message.channel.id].prefix + 'howgay')){
        client.commands.get('howgay').execute(message, args)
    }
    if (msg.startsWith(guildconf[message.channel.id].prefix + 'kill')){
        client.commands.get('kill').execute(message, args)
    }
    if (msg.startsWith(guildconf[message.channel.id].prefix + 'purge')) {
      client.commands.get('purge').execute(message, args)
    }
})

client.on('message', async message => {
    let msg = message.content.toLowerCase();
    
    
    if (!guildconf[message.channel.id]){
        guildconf[message.channel.id] = {
            prefix: 'a!'
        }
    }
    fs.writeFile('./guildConf.json', JSON.stringify(guildconf, null, 2), (err) =>{
        if (err) console.log(err);
    })
    
    if (message.author.bot) return
    if (!message.content.startsWith(guildconf[message.channel.id].prefix)) return

    const args = message.content.substring(PREFIX.length).split(" ")
    const serverQueue = queue.get(message.guild.id)
    const searchString = args.slice(1).join(' ')
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : ''

    if(msg.startsWith(guildconf[message.channel.id].prefix + 'play')){
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to play music.")
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send("I don\'t have permissions to connect to a voice channel.")
        if(!permissions.has('SPEAK')) return message.channel.send("I don\'t have permissions to speak in channel.")
        
        try {
          var video = await youtube.getVideoByID(url)
        } catch {
            try {
              var videos = await youtube.searchVideos(searchString, 1)
              var video = await youtube.getVideoByID(videos[0].id)
            } catch {
              return message.channel.send("I couldn\'t find any search results")
            }
        }

        const song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
        }

        if(!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,   
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 3,
                playing: true,
                loop: false,
            }
            queue.set(message.guild.id, queueConstruct)

            queueConstruct.songs.push(song)

            try {
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                play(message.guild, queueConstruct.songs[0])
            } catch (error) {
                console.log(`There was an error connecting to the voice channel: ${error}`)
                queue.delete(message.guild.id)
                return message.channel.send(`There was an error connecting to the voice channel: ${error}`)
            }
        } else {
            serverQueue.songs.push(song)
            return message.channel.send(`**${song.title}** has been added to the queue`)
        }
        return undefined

    }  else if(msg.startsWith(guildconf[message.channel.id].prefix + 'stop')){
        if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to stop music.')
        if(!serverQueue) return message.channel.send("There is nothing playing")
        serverQueue.songs = []
        serverQueue.connection.dispatcher.end()
        message.channel.send("I have stopped the music for you")
        return undefined
    } else if(msg.startsWith(guildconf[message.channel.id].prefix + 'skip')){
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to skip music.")
        if(!serverQueue) return message.channel.send("There is nothing playing")
        serverQueue.connection.dispatcher.end()
        message.channel.send("I have skipped music for you")
        return undefined
    } else if(msg.startsWith(guildconf[message.channel.id].prefix + 'volume')){
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use music commands.")
        if(!serverQueue) return message.channel.send("There is nothing playing.")
        if(!args[1]) return message.channel.send(`That volume is **${serverQueue.volume}**s`)
        if(isNaN(args[1])) return message.channel.send("That is not a valid amount to change the volume to!")
        serverQueue.volume = args[1]
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
        message.channel.send(`I have changed the volume to **${args[1]}**`)
        return undefined
    } else if(msg.startsWith(guildconf[message.channel.id].prefix + 'nowplaying')){
        if(!serverQueue) return message.channel.send('There is nothing playing.')
        message.channel.send(`Now Playing **${serverQueue.songs[0].title}**`)
    } else if(msg.startsWith(guildconf[message.channel.id].prefix + 'queue')){
        if(!serverQueue) return message.channel.send("There is nothing playing")
        message.channel.send(`
__**Song Queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now Playing:** ${serverQueue.songs[0].title}
        `, {split: true})
        return undefined
    } else if(msg.startsWith(guildconf[message.channel.id].prefix + 'pause')){
        if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use the pause command')
        if(!serverQueue) return message.channel.send('There is nothing playing.')
        if(!serverQueue.playing) return message.channel.send("The music is already paused")
        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause()
        message.channel.send("I have now paused the music for you")
        return undefined
    } else if(msg.startsWith(guildconf[message.channel.id].prefix + 'resume')){
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to resume the music")
        if(!serverQueue) return message.channel.send("There is nothing playing")
        if(serverQueue.playing) return message.channel.send("The music is already playing.")
        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume()
        message.channel.send("I have now resumed the music for you")
        return undefined
    } else if(msg.startsWith(guildconf[message.channel.id].prefix + 'bassboost')){
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use music commands.")
        if(!serverQueue) return message.channel.send("There is nothing playing.")
        serverQueue.connection.dispatcher.setVolumeLogarithmic(6 / 5)
        message.channel.send(`I have bass boosted the song!`)
        return undefined
    } else if (msg.startsWith(guildconf[message.channel.id].prefix + 'loop')){
      if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to do music commands!')
      if(!serverQueue) return message.channel.send('There is nothing playing.')

      serverQueue.loop = !serverQueue.loop

      return message.channel.send(`I have now ${serverQueue.loop ? `**Enabled**` : `**Disabled**`} loop.`)
    }
})

function play(guild, song) {
    const serverQueue = queue.get(guild.id)

    if(!song) {
        serverQueue.voiceChannel.leave()
        queue.delete(guild.id)
        return
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url))
        .on('finish', () => {
            if(!serverQueue.loop) serverQueue.songs.shift()
            play(guild, serverQueue.songs[0])
        })
        .on('error', error => {
            console.log(error)
        })
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)

        serverQueue.textChannel.send(`Started playing **${song.title}**`)
}

client.on('message', async message => {
  if (message.content.startsWith(`${prefix}covid`)) {
    const covidStats = await covid.all()

    return message.channel.send(new Discord.MessageEmbed()
        .setTitle('Covid19 Stats')    
        .setColor("BLUE")
        .addFields(
          {name: `Cases`, value: covidStats.cases.toLocaleString(), inline: true },
          {name: `Cases Today`, value: covidStats.todayCases.toLocaleString(), inline: true },
          {name: `Deaths`, value: covidStats.deaths.toLocaleString(), inline: true },
          {name: `Deaths Today`, value: covidStats.todayDeaths.toLocaleString(), inline: true },
          {name: `Recovered`, value: covidStats.recovered.toLocaleString(), inline: true },
          {name: `Recovered Today`, value: covidStats.todayRecovered.toLocaleString(), inline: true },
          {name: `Infected Right Now`, value: covidStats.active.toLocaleString(), inline: true },
          {name: `Critical Condition`, value: covidStats.critical.toLocaleString(), inline: true },
          {name: `Tested`, value: covidStats.tests.toLocaleString(), inline: true },
        )
    )
  }
})

client.login('REDACTED');
