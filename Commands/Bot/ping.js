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
        message.chat.sendMessage('Calcul du ping...').then(m => {
            m.delete();
            message.chat.sendMessage(`Mon ping est de ${(m.timestamp - message.timestamp) / 1000}ms`)
        })
    }
}