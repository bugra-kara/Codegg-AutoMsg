 /* Rolün izinlerini check */
const checkPermissionsRole = (role) => role.permissions.has('ADMINISTRATOR')||
role.permissions.has('KICK_MEMBERS')||
role.permissions.has('BAN_MEMBERS')||
role.permissions.has('MANAGE_GUILD')||
role.permissions.has('MANAGE_CHANNELS');
module.exports = {
    run: async(client, message, args) => {
        /* Mention ile etiketleyip kullanıcıdan rol silme - başlangıç */
        let user = message.mentions.members.first();
        if(user) {
            let args = message.content.toLocaleLowerCase().substring(32).replace(/\s+/g, '').split(",");
            let roleSet = new Set(args);
            roleSet.forEach(roleNames => {
                let { cache } = message.guild.roles;
            let role = cache.find(role => role.name.toLocaleLowerCase() === roleNames);
            if (role) {
                if (!user.roles.cache.has(role.id)){
                    message.channel.send("you don't have this role!" + "<@" + user.id + ">");
                    return;
                }
                if(checkPermissionsRole(role)){
                    message.channel.send("you cannot add to " + "<@" + user.id + ">" + "this role!");
                }
                else {
                    user.roles.remove(role)
                    .then(members => message.channel.send("you were removed this role from " + "<@" + user.id + ">"))
                    .catch(err => {console.log(err)});
                }
            }
            else {
                message.channel.send("Role not found");
            }
            })
        }
        /* Mention ile etiketleyip kullanıcıdan rol silme - bitiş */
        else {
            let args = message.content.toLocaleLowerCase().substring(9).replace(/\s+/g, '').split(",");
            let roleNames = args;
            let roleSet = new Set(roleNames); // tekrar edenleri siliyor.
            let { cache } = message.guild.roles;
                roleSet.forEach(roleNames => {
                    
                    let role = cache.find(role => role.name.toLocaleLowerCase() === roleNames);
                    if (role) {
                        if(!(message.member.roles.cache.has(role.id))) {
                            message.channel.send("you don't have this role!");
                            return;
                        }
                        else if (message.member.roles.cache.has(role.id)) {
                            message.member.roles.remove(role)
                                .then(member => message.channel.send("you are removed "+ role.name + " from yourself"))
                                .catch(err => {console.log(err);message.channel.send("Sth went wrong...") });
                                
                        }
                        else {
                            message.channel.send("You cannot remove" + role.name + "from yourself!");
                        }
                    }
                    else {
                        message.channel.send("Role not found");
                    }
                })
        }
    },
    aliases: ['roledel'],
    description: "roldel savaş botu"
}