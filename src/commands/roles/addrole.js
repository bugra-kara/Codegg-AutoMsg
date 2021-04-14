 /* Rolün izinlerini check */
const checkPermissionsRole = (role) => role.permissions.has('ADMINISTRATOR')|| role.permissions.has('KICK_MEMBERS')|| role.permissions.has('BAN_MEMBERS')|| role.permissions.has('MANAGE_GUILD')||role.permissions.has('MANAGE_CHANNELS');
module.exports = {
    run: async(client, message, args) => {
        /* Mention ile etiketleyip kullanıcıya rol ekleme - başlangıç */
        let user = message.mentions.members.first();
        if(user) {
            let args = message.content.toLocaleLowerCase().substring(32).replace(/\s+/g, '').split(",");
            let roleSet = new Set(args);
            let { cache } = message.guild.roles;
            roleSet.forEach(roleNames => {
            let role = cache.find(role => role.name.toLocaleLowerCase() === roleNames.toLocaleLowerCase());
            if (role) {
                if (user.roles.cache.has(role.id)){
                    message.channel.send("you already have this role!" + "<@" + user.id + ">");
                    return;
                }
                if(checkPermissionsRole(role)){
                    message.channel.send("you cannot add to " + "<@" + user.id + ">" + "this role!");
                }
                else {
                    user.roles.add(role)
                    .then(members => message.channel.send("you were added this role to " + "<@" + user.id + ">"))
                    .catch(err => {console.log(err)});
                }
            }
            else {
                message.channel.send("Role not found");
            }
            })
        }
        /* Mention ile etiketleyip kullanıcıya rol ekleme - bitiş */
    
        /* Rol ekleme - başlangıç */
        else {
        let args = message.content.toLocaleLowerCase().substring(9).replace(/\s+/g, '').split(",");
        let roleNames = args;
        let roleSet = new Set(roleNames); // tekrar edenleri siliyor.
            roleSet.forEach(roleNames => {
                let { cache } = message.guild.roles;
                let role = cache.find(role => role.name.toLocaleLowerCase() === roleNames);
                if (role) {
                    if(message.member.roles.cache.has(role.id)) {
                        message.channel.send("you alreadyy have this role!");
                        return;
                    }
                    if(checkPermissionsRole(role)){
                        message.channel.send("you cannot add yourself to this role yourself");
                    }
                    else {
                        message.member.roles.add(role)
                            .then(member => message.channel.send("you are added "+ role.name + " to yourself"))
                            .catch(err => {console.log(err)}); 
                    }
                }
                else {
                    message.channel.send("Role not found");
                }
            })
        }
    },
    aliases: ['roleadd'],
    description: "addrole savaş botu"
}