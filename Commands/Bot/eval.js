const Command = require(`../../Structure/Command.js`);

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: `eval`,
            description: `Eval a js code.`,
            category: `Bot`,
            enabled: true,
            aliases: [],
            cooldown: 3,
            dmOnly: false,
        });
    }

    async run(message, args, data) {
        if (parseInt(message.author.id) !== parseInt(data.config.ownerID)) return message.chat.sendMessage(`You do not have the permission to use this command.`)
        let result = new Promise((resolve) => resolve(eval(args.join(` `))));

        return result.then((output) => {
            if (typeof output !== `string`) {
                output = require(`util`).inspect(output, { depth: 0 });
            }
            message.chat.sendMessage(output)
        }).catch((err) => {
            err = err.toString();
            message.chat.sendMessage(err);
        });
    }
}