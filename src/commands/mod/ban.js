module.exports = {
    run: async(client, message, args) => {

        console.log("çalıştı");
        if(!message.member.hasPermission('BAN_MEMBERS')){
            message.channel.send("You don't have a perm!");
        }
        else {
            let userId = message.content.substring(message.content.indexOf(' ') + 1);
            try {
            let check = message.guild.members.cache.get(userId);
            console.log(check);
            //console.log(client.users.cache);
            if(check) {
               check.ban()
               .then(user => console.log("banned" + user))
               .catch(err => {console.log(err)})
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
     aliases: ['banuser'],
     description: "banuser botu"
}
    