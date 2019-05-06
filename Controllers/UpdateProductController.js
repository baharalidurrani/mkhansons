const ProductModel = require("../Models/Product");

exports.get = (req, res) => {
    ProductModel.find().populate('_company').then((inDB) => {
        // console.log('in DB products');
        // console.log(inDB);
        res.render('UpdateP.ejs', { products: inDB });
    });
}

exports.post = (req, res) => {
    console.log(req.body);

    ProductModel.findByIdAndUpdate(req.body.PRODUCT, {
        _name: req.body.NAME,
        _price: req.body.PRICE
    }).then((doc) => {
        console.log('product updated ' + doc);
        res.redirect('/updatep');
    });
}