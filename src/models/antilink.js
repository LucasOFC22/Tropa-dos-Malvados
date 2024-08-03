const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    Logs: { type: String },
    
});

const rolemodel = mongoose.model('antilink', roleSchema);

module.exports = rolemodel;