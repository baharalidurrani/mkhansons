const ProductModel = require("../Models/Product");

exports.get = (req, res) => {
    ProductModel.findByIdAndRemove(req.query.id).then((doc) => {
        res.redirect('/updatep');
        console.log('product deleted', doc);
    });
}
