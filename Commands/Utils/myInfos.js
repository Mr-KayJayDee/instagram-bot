const Command = require(`../../Structure/Command.js`);

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: `myinfos`,
            description: `Return some informations about you.`,
            category: `Utils`,
            enabled: true,
            aliases: [`me`],
            cooldown: 3,
            dmOnly: false,
        });
    }

    async run(message, args) {
        message.chat.sendMessage(
`FUll Name: ${message.author.fullName}
Username: ${message.author.username}
ID: ${message.author.id}
Biography:\n${message.author.biography}
Followers: ${message.author.followerCount}
Following: ${message.author.followingCount}
Business: ${message.author.isBusiness}
Verified: ${message.author.isVerified}
Private: ${message.author.isPrivate}
Number Of Posts: ${message.author.mediaCount}
Number Of IGTV posts: ${message.author.totalIgtvVideos}
`)
    }
}