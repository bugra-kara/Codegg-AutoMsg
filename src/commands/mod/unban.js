module.exports = {
    run: async(client, message, args) => {
        console.log("çalıştı");
        if(!message.member.hasPermission('BAN_MEMBERS')){
            message.channel.send("You don't have a perm!");
        }
        else {
            let userId = message.content.substring(message.content.indexOf(' ') + 1);
            if(userId) {
               message.guild.members.unban()
               .then(user => console.log("unbanned" + userId))
               .catch(err => {console.log()})
            }
            else {
                message.channel.send("Üye yko kardesim");
            }
        }
     },
     aliases: ['unbanuser'],
     description: "unban botu"
}