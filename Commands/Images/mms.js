let Command = require(`../../Structure/Command.js`);
const DIG = require(`discord-image-generation`);

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: `mms`,
            description: `Return an m&ms image.`,
            category: `Images`,
            enabled: true,
            aliases: [],
            cooldown: 3,
            dmOnly: false,
        });
    }

    async run(message, args) {
        let avatar = message.author.avatarURL;
        let img = await new DIG.Mms().getImage(avatar);
        message.chat.sendMessage(`Please wait we're generating your image...`);
        message.chat.sendPhoto(img);
    }
};