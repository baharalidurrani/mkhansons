const ProductModel = require("../Models/Product");

exports.get = (req, res) => {

    let today = new Date().toLocaleDateString();

    ProductModel.find({ _lastDate: today }).populate('_company').then((docs) => {
        console.log(docs);
        res.send(docs);
    });

    // res.render('Bill.ejs');
}
