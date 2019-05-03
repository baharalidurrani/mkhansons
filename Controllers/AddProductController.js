const CompanyModel = require("../Models/Company");
const ProductModel = require("../Models/Product");

exports.get = (req, res) => {
    CompanyModel.find().then((inDB) => {
        // console.log('in DB companies');
        // console.log(inDB);
        var passedVariable = req.query.product;

        res.render('AddProduct.ejs', {
            companies: inDB,
            toast: passedVariable
        });
    });
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
        var string = encodeURIComponent(req.body.NAME);
        res.redirect('/addp?product=' + string);
    });
}