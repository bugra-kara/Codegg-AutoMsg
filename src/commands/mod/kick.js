const { aliases } = require("../roles/addrole");

module.exports = {
    run: async(client, message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS')){
            message.channel.send("You don't have a perm!");
        }
        else {
            let userId = message.content.substring(message.content.indexOf(' ') + 1);
            try {
            let check = message.guild.members.cache.get(userId);
            //console.log(client.users.cache);
            if(check) {
               check.kick()
               .then(user => message.channel.send("kicked" + user.nickname))
               .catch(err => {console.log()})
            }
            else {
                message.channel.send("Üye yko kardesim");
            }
            }
            catch(err) {
                console.log(err);
            }
        }
     },
     aliases: ['kickuser'],
     description: "kickuser botu"
}