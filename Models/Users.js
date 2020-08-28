const mongoose = require(`mongoose`),
    Schema = mongoose.Schema;

module.exports = mongoose.model(`Users`, new Schema({
    id: String,
    reminds: {
        type: Array,
        default: []
    },
}));
