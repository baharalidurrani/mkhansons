const ProductModel = require("../Models/Product");

exports.get = (req, res) => {
    ProductModel.find().populate('_company').then((inDB) => {
        // console.log('in DB products');
        // console.log(inDB);
        res.render('Home.ejs', { products: inDB });
    })
};