const discord = require('discord.js');
const Canvas = require('canvas');
module.exports = {
    run: async(client, message, args) => {
        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
            // Declare a base size of the font
            let fontSize = 18;
            do {
                // Assign the font to the context and decrement it so it can be measured again
                ctx.font = `${fontSize -= 5}px sans-serif`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (ctx.measureText(text).width > canvas.width - 200);
        
            // Return the result to use in the actual canvas
            return ctx.font;
        };
        const canvas = Canvas.createCanvas(323,220);
        const ctx = canvas.getContext('2d');
        const bg = await Canvas.loadImage('././wallpaper.png');
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format:'jpg'}));
        const avatar2 = await Canvas.loadImage("https://cdn.discordapp.com/avatars/"+message.mentions.members.first().user.id+"/"+message.mentions.members.first().user.avatar+".jpeg")
        ctx.drawImage(avatar, 7, 65, 130, 130);
        ctx.drawImage(avatar2, 186, 65, 130, 130);
        ctx.font = applyText(canvas, message.author.username);
        ctx.fillStyle = '#000000';
        ctx.fillText(message.author.username, 40, 214);
        ctx.fillStyle = '#000000';
        ctx.font = applyText(canvas, message.mentions.members.first().user.username);
        ctx.fillText(message.mentions.members.first().user.username, 235, 214);
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'example.png');
        
        if(message.mentions.members.first() !== undefined){
        let user1 = message.author.username;
        let user1Hp = 100;
        let user2Hp = 100;
        let i = 0;
        let firstPlayer = Math.floor(Math.random()* 2);
        let a = ["", "Ölüm kalım savaşı başlıyor\n", ""];
        let user2 = message.mentions.members.first().user.username;
        let embed = {
            title: "dövüşmen guzum",
            color: 0x521389,
            description: a[1],
            fields:[
                {
                name: user1,
                value: user1Hp + "/100",
                inline: true
            },
            {
                name: user2,
                value: user2Hp + "/100",
                inline: true
            }
        ]
        }
        message.channel.send({embed: embed, files: [attachment]})
        .then(message => {   
        function check() {
            if(user1Hp<=0)
            {
                a[i+2] = ":trophy: " + user2 + " kazandı!";
                embed.description = a[i] + a[i+1] + a[i+2];
                embed.color = 0xdbf410;
                embed.fields[1].value = user2Hp + "/100";
                message.edit({embed: embed});
                return;
            }
            else
            {
                a[i+2] = ":trophy: " + user1 + " kazandı!";
                embed.description = a[i] + a[i+1] + a[i+2];
                embed.color = 0xdbf410;
                embed.fields[0].value = user1Hp + "/100";
                message.edit({embed: embed});
                return;
            }
        }
        const timer = ms => new Promise(res => setTimeout(res, ms))
        async function load () { // We need to wrap the loop into an async function for this to work
            if(firstPlayer === 0){
                user1R();
             }else{
                 user2R();
             }
                    async function user1R(){
                        let damage = Math.floor(Math.random()* 30)+1;;
                        if(user1Hp <=0 || user2Hp <=0){
                            check();
                        }
                        else{
                            user1Hp = user1Hp - damage;
                            if(user1Hp <=0){
                                embed.fields[0].value = 0 + "/100";
                            }
                            else{
                                embed.fields[0].value = user1Hp + "/100";
                            }
                            a[i+2] = ":left_facing_fist: " + user1 + ", " + user2 + " tarafından " + damage + " hasar aldı!\n";
                            embed.description = a[i] + a[i+1] + a[i+2];
                            embed.color = 0x43db14;
                            message.edit({embed: embed});
                            await timer(2000); // then the created Promise can be awaited
                            i++;
                            user2R();
                        }
                    }
                   async function user2R(){
                        let damage = Math.floor(Math.random()* 30)+1;
                        if(user1Hp <=0 || user2Hp <=0){
                            check();
                        }
                        else{
                            user2Hp = user2Hp - damage;
                            if(user2Hp <=0) {
                                embed.fields[1].value = 0 + "/100";
                            } 
                            else{
                                embed.fields[1].value = user2Hp + "/100";
                            }
                            a[i+2] = ":right_facing_fist: "+user2+ ", " + user1 + " tarafından " + damage + " hasar aldı!\n";
                            embed.description = a[i] + a[i+1] +a[i+2];
                            embed.color = 0xdb1414;
                            message.edit({embed: embed});
                            await timer(2000); // then the created Promise can be awaited
                            i++;
                            user1R();
                        }
                    }
        }
            load();
        })
        }
        else{
        message.channel.send("Herhangi birini etiketlemediniz veya sunucuda olmayan birini etiketlemeye çalıştınız. Lütfen \"!battle @kullanici-adi\" şeklinde tekrar deneyiniz.");
        }
    },
    aliases: [],
    description: "battle savaş botu"
}