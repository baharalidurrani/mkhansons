const CompanyModel = require("../Models/Company");
const ProductModel = require("../Models/Product");

exports.get = (req, res) => {
    CompanyModel.find().then((inDB) => {
        console.log('in DB companies');
        console.log(inDB);
        res.render('AddProduct.ejs', { companies: inDB });
    })
}

exports.post = (req, res) => {
    var pModel = new ProductModel({
        _name: req.body.NAME,
        _company: req.body.COMPANY,
        _price: req.body.PRICE
    });
    pModel.save().then((data) => {
        console.log("New Product added");
        console.log(data);
        res.redirect('/addp');
    });
    // console.log(req.body);
}