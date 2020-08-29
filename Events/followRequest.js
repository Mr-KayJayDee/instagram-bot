module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async emit(user) {
        this.client.logger.log(`${user.fullName} (${user.username}) wants to follow you.`, `log`)
        user.approveFollow();
    }
}
