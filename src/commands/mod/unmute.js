module.exports = {
    run: async(client, message, args) => {
        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])){
            message.channel.send("You don't have a perm!");
        }
        else{
            let userId = message.content.substring(message.content.indexOf(' ') + 1);
            let member = message.guild.members.cache.get(userId);
            if (member) {
                if (member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
                    message.channel.send("You cannot mute that person!");
                }
                else {
                    let mute = message.guild.roles.cache.get('806927248032006174')
                    member.roles.remove(mute).then(message.channel.send(member.user.username + " unmuted"));
                }
            }
            else {
                message.channel.send("Member not found");
            }
        }
     },
     aliases: ['unmuteuser'],
     description: "unmute botu"
}