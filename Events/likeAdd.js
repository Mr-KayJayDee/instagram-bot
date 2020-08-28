module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async emit(user, message) {
        console.log(`${user.fullName} (${user.username}) liked a message from ${message.author.fullName} (${message.author.username})`)
    }
}
