const { Client } = require(`@androz2091/insta.js`),
    Collection = require(`@discordjs/collection`)
path = require(`path`);

class InstaBot extends Client {
    constructor(options) {
        super(options);
        [`commands`, `aliases`, `cooldowns`].forEach(x => this[x] = new Collection());
        this.config = require(`../config`);
        this.logger = require(`../Helpers/logger`);
        this.usersData = require(`../Models/Users`);
        this.groupsData = require(`../Models/Groups`)
        this.groupMembersData = require(`../Models/GroupMembers`)
        this.databaseCache = {};
        this.databaseCache.users = new Collection();
        this.databaseCache.groups = new Collection();
        this.databaseCache.groupMembers = new Collection();
    }

    loadCommand(commandPath, commandName) {
        try {
            const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }

    async unloadCommand(commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if (this.aliases.has(commandName)) {
            command = this.commands.get(this.aliases.get(commandName));
        }
        if (!command) {
            return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
        }
        if (command.shutdown) {
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }

    async findOrCreateUser({ id: userID }, isLean) {
        if (this.databaseCache.users.get(userID)) {
            return isLean ? this.databaseCache.users.get(userID).toJSON() : this.databaseCache.users.get(userID);
        } else {
            let userData = (isLean ? await this.usersData.findOne({ id: userID }).populate(`members`).lean() : await this.usersData.findOne({ id: userID }).populate(`members`));
            if (userData) {
                if (!isLean) this.databaseCache.users.set(userID, userData);
                return userData;
            } else {
                userData = new this.usersData({ id: userID });
                await userData.save();
                this.databaseCache.users.set(userID, userData);
                return isLean ? userData.toJSON() : userData;
            }
        }
    }

    async findOrCreateGroupMember({ id: userID, groupID: groupID }, isLean) {
        if (this.databaseCache.groupMembers.get(`${userID}-${groupID}`)) {
            return isLean ? this.databaseCache.groupMembers.get(`${userID}-${groupID}`).toJSON() : this.databaseCache.groupMembers.get(`${userID}-${groupID}`);
        } else {
            let groupMemberData = (isLean ? await this.groupMembersData.findOne({ id: userID, groupID: groupID }).populate(`members`).lean() : await this.groupMembersData.findOne({ id: userID, groupID: groupID }).populate(`members`));
            if (groupMemberData) {
                if (!isLean) this.databaseCache.groupMembers.set(`${userID}-${groupID}`, groupMemberData);
                return groupMemberData;
            } else {
                groupMemberData = new this.groupMembersData({ id: userID, groupID: groupID });
                await groupMemberData.save();
                this.databaseCache.groupMembers.set(`${userID}-${groupID}`, groupMemberData);
                return isLean ? groupMemberData.toJSON() : groupMemberData;
            }
        }
    }

    async findOrCreateGroup({ groupID: groupID }, isLean) {
        if (this.databaseCache.groups.get(groupID)) {
            return isLean ? this.databaseCache.groupMembers.get(groupID).toJSON() : this.databaseCache.groupMembers.get(groupID);
        } else {
            let groupData = (isLean ? await this.groupMembersData.findOne({ groupID: groupID }).populate(`members`).lean() : await this.groupMembersData.findOne({ groupID: groupID }).populate(`members`));
            if (groupData) {
                if (!isLean) this.databaseCache.groupMembers.set(groupID, groupData);
                return groupData;
            } else {
                groupData = new this.groupMembersData({ groupID: groupID });
                await groupData.save();
                this.databaseCache.groupMembers.set(groupID, groupData);
                return isLean ? groupData.toJSON() : groupData;
            }
        }
    }
}

module.exports = InstaBot;