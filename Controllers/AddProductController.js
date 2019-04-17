const CompanyModel = require("../Models/Company");

exports.get = (req, res) => {
    CompanyModel.find().then((inDB) => {
        console.log('in DB companies');
        console.log(inDB);
        res.render('AddProduct.ejs', { companies: inDB });
    })
};