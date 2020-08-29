const mongoose = require(`mongoose`),
    Schema = mongoose.Schema,
    config = require(`../config`);

module.exports = mongoose.model(`Users`, new Schema({
    id: String,
    reminds: {
        type: Array,
        default: []
    },
    prefix: {
        type: String,
        default: config.defaultPrefix,
    }
}));
