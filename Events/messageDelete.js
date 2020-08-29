module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async emit(cachedMessage) {
        if (!cachedMessage) return;
        this.client.logger.log(`@${cachedMessage.author.username} has just deleted their message: ${cachedMessage.content}`, `log`);
    }
}
