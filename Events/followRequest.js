module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async emit(user) {
        console.log(`${user.fullName} (${user.username}) wants to follow you.`)
        user.approveFollow();
    }
}
