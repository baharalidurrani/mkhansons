exports.get = (req, res) => {
    res.render('Bill.ejs');
}

exports.post = (req, res) => {
    console.log(req.body);
}