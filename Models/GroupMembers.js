const mongoose = require(`mongoose`),
    Schema = mongoose.Schema;

module.exports = mongoose.model(`GroupMembers`, new Schema({
    id: String,
    groupID: String,
}));
