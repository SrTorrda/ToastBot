
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const bot = new Discord.Client();
require('http').createServer().listen(3000);


const PREFIX = 'Tb!';
const Avatar = ''

function command(x){
    if (x[0] == "T" && x[1] == "b" && x[2] == "!"){
        return true;
    } else {
        return false;
    }
}

bot.on('ready',() =>{
    console.log('TOAST IS READY')}
)

bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'Humanos Sofrendo',
            type: "WATCHING",
        }
    });
});

bot.on('message',message=>{
    if (message.content == "@ToastBot" ){
        message.channel.send("Use Tb!help para ver os comandos")
    }
    if (message.content == 'Tb!'){
        message.channel.send("Digite Tb!help para consiguir os comandos");
    }
    if (command(message.content)){
        let args = message.content.substring(PREFIX.length).split(" ")  
        switch(args[0]){
            case 'ping':
                message.channel.send("pong!");
                break;
            case 'help':
                message.reply("Esses são os comandos\nTb!help\nTb!ping\nTb!mention\nTb!info\nTb!meme\nTb!FlipCoin\nTb!Ask\nTb!Rate");
                break;
            case 'mention':
                message.channel.send("@everyone");
                break;
            case 'info':
                message.channel.send("Eu sou o bot do Sr.Torrada");
                break;
            case 'meme':
                console.log('MEME REQUEST');
                message.channel.startTyping();
                randomPuppy('meirl').then(async url => {
                    await message.channel.send({
                        files: [{
                            attachment: url,
                            name: 'meme.png'
                        }]
                    }).then(() => {
                            message.channel.stopTyping();
                            console.log('SENT MEME');
                        });
                }).catch(err => console.error(err));
                break;
            case 'SetStatus':
                let allowedRole = message.guild.roles.find(role => role.name === "Deep fricking weeb");
                if (message.member.roles.has(allowedRole.id)){
                    if (args[1] != null){
                        bot.user.setPresence({
                            game: {
                                name: args[1],
                                type: args[2],
                        }
                        });
                    } else {
                        message.channel.send("ERROR!");
                    }
                } else {
                    message.channel.send("don't try to help")
                }
                break;
            case 'FlipCoin':
                var rnd =  Math.random();
                if (rnd < 0.5){
                    message.channel.send("CARA!")
                } else {
                    message.channel.send("COROA!")    
                }
                break;
            case 'Say':
                    let allowedRole2 = message.guild.roles.find(role => role.name === "Deep fricking weeb");
                    if (message.member.roles.has(allowedRole2.id)){
                        if (args[1] != null){
                            bot.channels.get(`577638864219537409`).send(args[1])
                        } else {
                            message.channel.send("ERROR!");
                        }
                    } else {
                        message.channel.send("DON'T CONTROL ME PLEA@#S@E")
                    }
                    break;
            case 'Ask':
                var rnd =  Math.random();
                var msg = message.content;
                var upper = msg.toUpperCase();
                if (upper.includes("FBI") || upper.includes("ILLUMINATI")){
                    message.channel.send("Eu não posso responder isso... :shushing_face: ")      
                } else{    
                    if (rnd < 0.5){
                        message.channel.send("Sim, Com certeza!")
                    } else {
                        message.channel.send("Acho que não")    
                    }       
                }
                break;
            case 'Rate':
                var rnd = Math.random()*10;
                rnd = Math.round(rnd);
                message.channel.send("Eu dou uma nota de " + rnd+"/10");     
                break;
            case 'RandomWiki':
                message.channel.send("https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria");
                break;      
            }
        }
});


bot.login(process.env.TOKEN);