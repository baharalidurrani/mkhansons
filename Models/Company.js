const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    _name: {
        type: String,
        trim: true,
        required: true
    }
});

var CompanyModel = mongoose.model('Company', CompanySchema);
module.exports = CompanyModel;