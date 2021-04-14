require('dotenv').config();
const discord = require ('discord.js');
const client = new discord.Client({ partials: ['MESSAGE', 'REACTION']});
const PREFIX = process.env.PREFIX;
const fs = require('fs').promises;
const path = require('path');
const { checkCommandModule } = require('./utils/validate');
const { checkProperties } = require('./utils/validate');
const tableConfig = require('./utils/tableConfig');
const { createStream, table } = require('table');
const c = require('ansi-colors');
const database = require('./database/database');
const MessageModel = require('./database/models/messages');
const commandStatus = [
    [`${c.yellow.bold('Command')}`, `${c.bold('Status')}`, `${c.bold('Description')}` ]
];
const cachedMessageReactions = new Map();
client.commands = new Map();
client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    var channel = client.channels.cache.get('831179480944738315');
    var postLink = [];
    var checkminutes = 1, checkthe_interval = checkminutes * 20 * 500; //This checks every 10 minutes, change 10 to whatever minute you'd like
    setInterval(function() {
        (async function () {
            const puppeteer = require('puppeteer');
            puppeteer.launch({ headless: true, args: ['--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] }).then(async browser => {
                const page = await browser.newPage();
                await page.goto("https://www.binance.com/en/support/announcement/c-93?navId=93/");
                await page.waitForSelector('body');
                var rposts = await page.evaluate(() => {
                    let posts = document.querySelectorAll('.css-6f91y1 > .css-vurnku');       
                    postItems = [];
                    posts.forEach((item) => {
                        let title = ''
                        let link = ''
                        try{
                         title = item.querySelector('a').innerText;
                         console.log(title);
                        if (title!=''){
                             link = item.querySelector('a').href;
                             console.log(title, link);
                             postItems.push({title: title, link: link,});
                        }
                        }catch(e){
                        }
                    });
                    var items = { 
                        "posts": postItems
                    };
                    
                    return items;
                    
                });
                postLink[0] = rposts.posts[0].link.toString();
                if(postLink[1] === rposts.posts[0].link.toString()){
                    await browser.close();
                }
                else {
                    postLink[1] = postLink[0];
                    await channel.send(rposts.posts[0].link).then(sentMessage => {
                        sentMessage.delete({timeout: 1200000});
                    });
                    await browser.close();
                }
            }).catch(function(error) {
                console.error(error);
            });
            })();
	//Or anything else
    }, checkthe_interval);
    
    let stream = createStream(tableConfig);
    let i = 0;
    let fn = setInterval(() => {
        if (i === commandStatus.length)
        {clearInterval(fn);}
        else {
            stream.write(commandStatus[i]);
            i++;
        }
    }, 250);
    database.then(() => console.log("connected to mongodb")).catch(err => console.log(err));
})
client.on('message', message => {
    if (!message.content.startsWith(PREFIX)) return; //botun mesajlarını okumayı engelleme.
    let cmdName = message.content.substring(message.content.indexOf(PREFIX)+1).split(new RegExp(/\s+/)).shift();
    let argsToParse = message.content.substring(message.content.indexOf(' ')+1);
    if (client.commands.get(cmdName)){
        client.commands.get(cmdName)(client, message, argsToParse);
    }
    else {
        console.log("doesnt exists")
    }
    // const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    // const command = args.shift().toLowerCase();
    // /* Embed - başlangıç */
    // else if (isValidCommand(message, "embed")){
    //     let embedContent = message.content.substring(7);
    // console.log(embedcontent);
    // let embed = new discord.messageembed();
    // embed.addfield('message', embedcontent)
    // embed.setcolor('#521389');
    // embed.setımage(message.author.displayavatarurl());
    // embed.setauthor(message.author.tag, message.author.displayavatarurl());
    // embed.setdescription("ananızı sikmeye geliyoruz");
    // embed.settimestamp();
    // message.channel.send(embed);
    //     let embed = {
    //         image: {
    //             url: message.author.displayAvatarURL()
    //         },
    //         description: "Selam",
    //         fields: {
    //             name: message.content,
    //             value: message.author.tag
    //         },
    //         timestamp: new Date(),
    //         video: {
    //             url: "https://www.youtube.com/watch?v=PS2FhF_fcL0",
    //         }
    //     }
    //     message.channel.send({embed: embed});
    // }
    // /* Embed - bitis */

    // else if (isValidCommand(message, "say")){
    //     let annon = message.content.substring(5);
    //     let annonChannel = client.channels.cache.get('806882601821405224');
    //     let newsChannel = client.channels.cache.find(channel => channel.name.toLowerCase() === "haberler");

    //     if(newsChannel){
    //         newsChannel.send(annon);
    //     }

    //     // if (annonChannel){
    //     //     annonChannel.send(annon);
    //     // }
    // }
    // /* Avatar ve react - başlangıç */
    // else if (command === 'avatar') {
    //     message.channel.send("https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg");
    // }
    // else if (command === 'avatars') {
    //     const taggedUser = message.mentions.users.first();
    //     message.channel.send("https://cdn.discordapp.com/avatars/"+taggedUser.id+"/"+taggedUser.avatar+".jpeg")
    // }
    // else if (command === 'fruits') {
    //     message.react('🍎')
    //         .then(() => message.react('🍊'))
    //         .then(() => message.react('🍇'))
    //         .catch(() => console.error('One of the emojis failed to react.'));
    // }
    /* Avatar ve react - bitiş */
});
/*
*/
client.on('messageReactionAdd', async (reaction, user) => {
    let addUserRole = (emojiRoleMappings) => {
        if(emojiRoleMappings.hasOwnProperty(reaction.emoji.id)) {
            let roleId = emojiRoleMappings[reaction.emoji.id];
            let role = reaction.message.guild.roles.cache.get(roleId);
            let member = reaction.message.guild.members.cache.get(user.id);
            if (role && member) {
                member.roles.add(role);
            }
        }
            
    }
    if(reaction.message.partial) {
        await reaction.message.fetch();
        let { id } = reaction.message;
        try {
            let msgDocument = await MessageModel.findOne({ messageId: id});
            if (msgDocument) {
                cachedMessageReactions.set(id, msgDocument.emojiRoleMappings);
                let { emojiRoleMappings } = msgDocument;
                addUserRole(emojiRoleMappings);
            }
        }
        catch (err) {
            console.log(err);
            
        }
    }
    else {
        let emojiRoleMappings = cachedMessageReactions.get(reaction.message.id);
        console.log(emojiRoleMappings);
        if(emojiRoleMappings){
            addUserRole(emojiRoleMappings);
        }
    }
});

/* Sunucuya gelen her mesajda tetikleniyor - başlangıç */

/* Sunucuya gelen her mesajda tetikleniyor - bitiş */

(async function registerCommands(dir = 'commands') {
    // Read the directory/file.
    let files = await fs.readdir(path.join(__dirname, dir));
    //console.log (files);
    // Loop through each file:
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) // If file is a directory, recursive call recurDir
        {
            registerCommands(path.join(dir, file));
        }   
        else {
            if (file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                try {
                    let cmdModule = require(path.join(__dirname, dir, file));
                    if (checkCommandModule(cmdName,cmdModule)){
                        if(checkProperties(cmdName, cmdModule)) {
                            let { aliases } = cmdModule;
                            client.commands.set(cmdName, cmdModule.run);
                            if(aliases.length !==0 ) {
                            aliases.forEach(alias => {
                                client.commands.set(alias, cmdModule.run);
                                commandStatus.push (
                                    [
                                        `${c.cyan(`${cmdName}`)}`, `${c.bgGreenBright('Success')}`, `${c.cyan(`${cmdModule.description}`)}`
                                    ]
                                )
                                
                            });
                            }
                        }
                    }
                }
                catch(err) { 
                    commandStatus.push (
                        [
                            `${c.white(`${cmdName}`)}`, `${c.bgRedBright('Failed')}`, err
                        ]
                    )
                }
            }
        }
    }

})();