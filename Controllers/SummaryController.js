const ProductModel = require("../Models/Product");

exports.get = (req, res) => {

    let today = new Date().toLocaleDateString();

    ProductModel.find({ _lastDate: today }).populate('_company').sort('_company').then((docs) => {
        res.render('Summary.ejs', {
            data: docs,
            date: new Date()
        });
    });

}
