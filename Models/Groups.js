const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

module.exports = mongoose.model("Groups", new Schema({
    groupID: String,
    reminds: {
        type: Array,
        default: []
    },
}));
