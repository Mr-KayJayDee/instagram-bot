const Command = require(`../../Structure/Command.js`);

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: `ping`,
            description: `Return the bot ping.`,
            category: `Bot`,
            enabled: true,
            aliases: [`latency`],
            cooldown: 3,
            dmOnly: false,
        });
    }

    async run(message, args) {
        message.chat.sendMessage(`Fetching ping...`).then(m => {
            m.delete();
            message.chat.sendMessage(`My ping is currently at ${(m.timestamp - message.timestamp) / 1000}ms\nI use ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb of RAM`)
        })
    }
}