let Command = require(`../../Structure/Command.js`);
const DIG = require("discord-image-generation");

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "invert",
            description: "Returnan inverted image.",
            category: "Images",
            enabled: true,
            aliases: [],
            cooldown: 3,
            dmOnly: false,
        });
    }

    async run(message, args) {
        let avatar = message.author.avatarURL;
        let img = await new DIG.Invert().getImage(avatar);
        message.chat.sendMessage("Please wait we're generating your image...");
        message.chat.sendPhoto(img);
    }
};