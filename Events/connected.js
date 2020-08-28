module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async emit() {
        this.client.logger.log(`Logged in as ${this.client.user.fullName} (${this.client.user.username}).`, `ready`);
        this.client.logger.log(`Followers: ${this.client.user.followerCount}`, `ready`);
        this.client.logger.log(`Following: ${this.client.user.followingCount}`, `ready`);
        this.client.logger.log(`Business : ${this.client.user.isBusiness}`, `ready`);
        this.client.logger.log(`Verified: ${this.client.user.isVerified}`, `ready`);
        this.client.logger.log(`Private: ${this.client.user.isPrivate}`, `ready`);
    }
}
