const Command = require("../../Structure/Command.js");

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Return the commands list.",
            category: "Bot",
            enabled: true,
            aliases: ["?"],
            cooldown: 3,
            dmOnly: false,
        });
    }

    async run(message, args) {
        message.chat.sendMessage("Here are the commands you can use ! https://github.com/Mr-KayJayDee/instagram-bot#available-commands")
    }
}