const mongoose = require(`mongoose`),
    Schema = mongoose.Schema,
    config = require(`../config`);

module.exports = mongoose.model(`Groups`, new Schema({
    groupID: String,
    reminds: {
        type: Array,
        default: []
    },
    prefix: {
        type: String,
        default: config.defaultPrefix,
    }
}));
