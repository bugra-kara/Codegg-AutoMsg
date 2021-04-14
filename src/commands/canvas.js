const Canvas = require('canvas');
const discord = require('discord.js');

module.exports = {
    run: async(client, message,args) => {
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
        //console.log(message.mentions.members.first());
        const ctx = canvas.getContext('2d');
        //console.log(message.author.username);
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
        message.channel.send(attachment);
    },
    aliases: [],
    description: "battle savaş botu"
}