const CompanyModel = require("../Models/Company");
exports.get = (req, res) => {
    CompanyModel.find().then((inDB) => {
        console.log('in DB companies');
        console.log(inDB);
        res.render('AddCompany.ejs', { inserted: inDB });
    })
}

exports.post = (req, res) => {
    var cModel = new CompanyModel({ _name: req.body.NAME });
    cModel.save().then((data) => {
        console.log("New Company added");
        console.log(data);
        res.redirect('/addc');
    });
}