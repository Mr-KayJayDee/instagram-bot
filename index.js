const InstaBot = require(`./Structure/Client`),
    client = new InstaBot();

const util = require(`util`),
    fs = require(`fs`),
    readdir = util.promisify(fs.readdir),
    mongoose = require(`mongoose`);
require(`dotenv`).config();

const initialize = async () => {
    let directories = await readdir(`./Commands/`);
    directories.forEach(async (dir) => {
        let commands = await readdir(`./Commands/` + dir + `/`);
        commands.filter((cmd) => cmd.split(`.`).pop() === `js`).forEach((cmd) => {
            const response = client.loadCommand(`./Commands/` + dir, cmd);
            if (response) {
                client.logger.log(response, `error`);
            }
        });
    });

    const evtFiles = await readdir(`./Events/`);
    evtFiles.forEach((file) => {
        const eventName = file.split(`.`)[0];
        const event = new (require(`./Events/${file}`))(client);
        client.on(eventName, (...args) => event.emit(...args));
        delete require.cache[require.resolve(`./Events/${file}`)];
    });
    client.login(process.env.BOTUSERNAME, process.env.PASSWORD);

    mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        client.logger.log(`Connected to the Mongodb database.`, `ready`);
    }).catch((err) => {
        client.logger.log(`Unable to connect to the Mongodb database. Error:` + err, `error`);
    });
};
initialize();

client.logger.log(`  ___           _                                  `);
client.logger.log(` |_ _|_ __  ___| |_ __ _  __ _ _ __ __ _ _ __ ___  `);
client.logger.log(`  | || '_ \\/ __| __/ _\` |/ _\` | '__/ _\` | '_ \` _ \\ `);
client.logger.log(`  | || | | \\__ \\ || (_| | (_| | | | (_| | | | | | |`);
client.logger.log(` |___|_| |_|___/\\__\\__,_|\\__, |_|  \\__,_|_| |_| |_|`);
client.logger.log(`                         |___/                     `);

process.on(`uncaughtException`, (error) => {
    if (!client) return;
    client.logger.log(`uncaughtException\n` + error.message);
});
process.on(`unhandledRejection`, (listener) => {
    if (!client) return;
    client.logger.log(`unhandledRejection\n` + listener.message);
});
process.on(`rejectionHandled`, (listener) => {
    if (!client) return;
    client.logger.log(`rejectionHandled\n` + listener.message);
});
process.on(`warning`, (warning) => {
    if (!client) return;
    client.logger.log(`warning\n` + warning.message);
});