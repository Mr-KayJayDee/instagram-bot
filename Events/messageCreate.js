const Collection = require("@discordjs/collection");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async emit(message) {
        const data = {};
        data.config = this.client.config;

        if (message.authorID === this.client.user.id) return;
        message.markSeen();
        if (message.chat.isGroup) {
            const groupMembersData = await this.client.findOrCreateGroupMember({ id: message.author.id, groupID: message.chat.id });
            data.groupMembers = groupMembersData;
            console.log(groupMembersData)
            const groupsData = await this.client.findOrCreateGroup({ groupID: message.chat.id });
            data.groups = groupsData;
        } else {
            const usersData = await this.client.findOrCreateUser({ id: message.author.id });
            data.users = usersData;
        }

        let prefixes = this.client.config.defaultPrefix;
        if (message.content.indexOf(prefixes) !== 0) return;
        let args = message.content.slice(prefixes.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let cmd =
            this.client.commands.get(command) ||
            this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;

        this.client.logger.log(`${message.author.username} (${message.authorID}) ran command ${cmd.help.name}`, "cmd")

        if (!cmd.conf.enabled) {
            return message.chat.sendMessage("Sorry this command is disabled.");
        }
        if (cmd.conf.dmOnly && message.chat.isGroup) {
            return message.chat.sendMessage("Sorry this command is usable only in a private conversation.");
        }

        if (!this.client.cooldowns.has(cmd.help.name)) {
            this.client.cooldowns.set(cmd.help.name, new Collection());
        };

        let timeNow = Date.now();
        let tStamps = this.client.cooldowns.get(cmd.help.name);
        let cdAmount = (cmd.help.cooldown || 3) * 1000;

        if (tStamps.has(message.authorID)) {
            let cdExpirationTime = tStamps.get(message.authorID) + cdAmount;
            if (timeNow < cdExpirationTime) {
                let timeLeft = (cdExpirationTime - timeNow) / 1000;
                return message.chat.sendMessage(`Please wait ${timeLeft.toFixed(0)} seconds to use the command ${cmd.help.name} again`);
            };
        };

        tStamps.set(message.authorID, timeNow);
        setTimeout(() => tStamps.delete(message.authorID), cdAmount);

        cmd.run(message, args, data);
    }
}
