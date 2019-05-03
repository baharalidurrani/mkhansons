const ProductModel = require("../Models/Product");

// exports.get = (req, res) => {
//     res.render('Bill.ejs');
// }

exports.post = (req, res) => {
    // console.log(req.body);
    let billitems = [];
    let totalbill = 0;
    let shopname = req.body.SHOP;

    let today = new Date().toLocaleDateString();

    for (let index = 0; index < req.body.PRODUCT.length; index++) {
        if (!req.body.QUANTITY[index])
            continue;

        let id = req.body.PRODUCT[index];
        let qty = parseInt(req.body.QUANTITY[index], 10);
        let ttl = qty * parseInt(req.body.PRICE[index], 10);
        totalbill += ttl;

        billitems.push({
            cname: req.body.CNAME[index],
            name: req.body.NAME[index],
            price: req.body.PRICE[index],
            quantity: req.body.QUANTITY[index],
            total: ttl
        });

        ProductModel.findById(id).then((doc) => {
            if (doc._lastDate === today) {
                doc._sold = doc._sold + qty;
                doc.save().then((ndata) => {
                    console.log('todays item re sold');
                    console.log(ndata);
                });
            }
            else {
                doc._lastDate = today;
                doc._sold = qty;
                doc.save().then((ndata) => {
                    console.log('yesterdays item sold')
                    console.log(ndata);
                });
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