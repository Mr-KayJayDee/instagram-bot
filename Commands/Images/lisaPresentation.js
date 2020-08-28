let Command = require(`../../Structure/Command.js`);
const DIG = require(`discord-image-generation`);

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: `lisapresentation`,
            description: `Return a lisa presentation image.`,
            category: `Images`,
            enabled: true,
            aliases: [`lisa`],
            cooldown: 3,
            dmOnly: false,
        });
    }

    async run(message, args) {
        let text = args.join(` `)
        if(!text) text = message.author.username;
        let img = await new DIG.LisaPresentation().getImage(text);
        message.chat.sendMessage(`Please wait we're generating your image...`);
        message.chat.sendPhoto(img);
    }
};