const Command = require(`../../Structure/Command.js`);

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: `bingo`,
            description: `Play a game of bingo.`,
            category: `Games`,
            enabled: true,
            aliases: [],
            cooldown: 3,
            dmOnly: false,
        });
    }

    async run(message, args) {
        message.chat.sendMessage(`The bingo has started, find a number between 1 and 100 in 2 minutes.`);
        let numberToFind = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        const collector = message.createMessageCollector({
            filter: (m) => m.content === String(numberToFind),
            idle: 120000
        });

        collector.on(`message`, (m) => {
            if (m.content === String(numberToFind)) {
                message.chat.sendMessage(`${m.author.fullName} (${m.author.username}) found the number, it was: ${numberToFind}, GG !!`)
                collector.end();
            }
        });

        collector.on(`end`, (reason) => {
            if (reason === `idle`) {
                message.chat.sendMessage(`The time is out and no one found the number... it was: ${numberToFind}!`)
            }
        });
    }
}