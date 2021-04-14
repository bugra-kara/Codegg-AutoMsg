const discord = require ('discord.js');
module.exports = {
    run: async(client, message, args) => {
        let user = message.author.username;
        let user2 = message.mentions.members.first();
        let user1Hp = 100;
        let user2Hp = 100;
        // let embed = new discord.MessageEmbed();
        // embed.addField(message.author.username, user1Hp + "/100" ,true);
        // embed.addField(user2.user.username, user2Hp + "/100" ,true);
        // embed.setDescription("Ölüm kalım savaşı başlıyor!");
        // message.channel.send({embed: embed});

        let embed = {
            image: {
                url: message.author.displayAvatarURL()
            },
            description: "Ölüm kalım savaşı başlıyor!",
            fields:[
                {
                name: user,
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
        message.channel.send({embed: embed})
        .then(message => {

            if (user1Hp<101 && user2Hp<101){
                console.log(user1Hp);
                random();
            }

        function random() {
            if (user1Hp>-1 && user2Hp>-1) {
                setTimeout(() => {
                    dene();
                }, 2000);
                
            }
        }
        function dene () {
            
            let randomsa = Math.floor(Math.random()*40)+20;
                console.log(randomsa + " b");
                user1Hp = user1Hp - randomsa;
                if (user1Hp>0){
                    embed.fields[0].value = user1Hp + "/100";
                }
                else {
                    embed.fields[0].value = 0 + "/100";
                }
                message.edit({embed: embed});
            setTimeout(() => {
                if (user1Hp>-1 && user2Hp>-1){
                    dene2();
                }
                else {
                    if(user1Hp>user2Hp){
                        console.log(embed.description);
                        embed.description = "game over";
                        message.edit({embed: embed});
                    }
                    else {
                        console.log(embed.description);
                        embed.description = "game over";
                        message.edit({embed: embed});
                    }
                }
            }, 2000);
           }
        function dene2 () {
            
            let randomsa = Math.floor(Math.random()*20)+20;
                console.log(randomsa + " a");
                user2Hp = user2Hp - randomsa;
                if (user2Hp>0){
                    embed.fields[1].value = user2Hp + "/100";
                }
                else {
                    embed.fields[1].value = 0 + "/100";
                }
                message.edit({embed: embed});
            setTimeout(() => {
                if (user1Hp>-1 && user2Hp>-1){
                    random();
                }
                else {
                    if(user1Hp>user2Hp){
                        console.log(embed.description);
                        embed.description = "game over";
                        message.edit({embed: embed});
                    }
                    else {
                        console.log(embed.description);
                        embed.description = "game over";
                        message.edit({embed: embed});
                    }
                }
            }, 2000);
           }
    })},
    aliases: [],
    description: "battle2 savaş botu"
}