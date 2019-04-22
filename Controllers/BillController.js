const ProductModel = require("../Models/Product");

exports.get = (req, res) => {
    res.render('Bill.ejs');
}

exports.post = (req, res) => {
    // console.log(req.body);
    let today = new Date().toLocaleDateString();
    console.log(today);
    for (let index = 0; index < req.body.PRODUCT.length; index++) {
        if (!req.body.QUANTITY[index])
            continue;
        const id = req.body.PRODUCT[index];
        const qty = req.body.QUANTITY[index];

        ProductModel.findById(id).then((doc) => {
            if (doc._lastDate == today) {
                let sold = doc._sold + qty;
                ProductModel.findOneAndUpdate({ _id: id }, { _sold: sold }, { new: true }).then((data) => {
                    console.log(data);
                });
            }
            else {
                ProductModel.findOneAndUpdate({ _id: id }, { _lastDate: today, _sold: qty }, { new: true }).then((data) => {
                    console.log(data);
                });
            }
        });
    }
}