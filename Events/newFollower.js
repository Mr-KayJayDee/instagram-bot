module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async emit(user) {
        this.client.logger.log(`${user.fullName} (${user.username}) started following you.`, `log`)
        user.follow();
    }
}
