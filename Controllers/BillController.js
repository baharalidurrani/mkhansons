const ProductModel = require("../Models/Product");

exports.get = (req, res) => {
    res.render('Bill.ejs');
}

exports.post = (req, res) => {
    // console.log(req.body);
    var billitems = [];
    var totalbill = 0;
    var shopname = req.body.SHOP;

    let today = new Date().toLocaleDateString();

    for (let index = 0; index < req.body.PRODUCT.length; index++) {
        if (!req.body.QUANTITY[index])
            continue;

        const id = req.body.PRODUCT[index];
        const qty = req.body.QUANTITY[index];
        const ttl = req.body.QUANTITY[index] * req.body.PRICE[index]
        totalbill += ttl;

        billitems.push({
            cname: req.body.CNAME[index],
            name: req.body.NAME[index],
            price: req.body.PRICE[index],
            quantity: req.body.QUANTITY[index],
            total: ttl
        });


        ProductModel.findById(id).then((doc) => {
            if (doc._lastDate == today) {
                let sold = doc._sold + qty;
                ProductModel.findOneAndUpdate({ _id: id }, { _sold: sold }, { new: true });
            }
            else {
                ProductModel.findOneAndUpdate({ _id: id }, { _lastDate: today, _sold: qty }, { new: true });
            }
        });
    }

    // console.log("/////////////////////////////////////////////////");
    // console.log(shopname);
    // console.log(billitems);
    // console.log(totalbill);

    res.render('Bill', {
        data: billitems,
        total: totalbill,
        shop: shopname
    });
}